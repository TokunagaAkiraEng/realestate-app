import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { PropertyForm } from '../components/PropertyForm'
import {
  fetchProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../services/propertyService'

export function PropertyListPage() {
  const { user, signOut } = useAuth()
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 初回表示時に物件の一覧を取得する（登録者に関わらず全件表示）
  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const data = await fetchProperties()
      setProperties(data)
    } catch (error) {
      setErrorMessage('物件の取得に失敗しました：' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddClick = () => {
    setEditingProperty(null)
    setIsFormOpen(true)
  }

  const handleEditClick = (property) => {
    setEditingProperty(property)
    setIsFormOpen(true)
  }

  const handleCancel = () => {
    setIsFormOpen(false)
    setEditingProperty(null)
  }

  const handleSubmit = async (values) => {
    setIsSubmitting(true)
    setErrorMessage('')
    try {
      if (editingProperty) {
        // 既存の物件を更新する
        await updateProperty(editingProperty.id, values)
      } else {
        // 新しい物件を登録する（登録者は自分自身）
        await createProperty({ ...values, userId: user.id })
      }
      setIsFormOpen(false)
      setEditingProperty(null)
      await loadProperties()
    } catch (error) {
      setErrorMessage('保存に失敗しました：' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (property) => {
    if (!window.confirm(`「${property.name}」を削除しますか？`)) return

    setErrorMessage('')
    try {
      await deleteProperty(property.id)
      await loadProperties()
    } catch (error) {
      setErrorMessage('削除に失敗しました：' + error.message)
    }
  }

  return (
    <div className="property-page">
      <header className="property-header">
        <h1>物件一覧</h1>
        <div className="property-header-right">
          <span>{user?.email} でログイン中</span>
          <button onClick={signOut}>ログアウト</button>
        </div>
      </header>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="property-toolbar">
        <button onClick={handleAddClick}>＋ 物件を新規登録</button>
      </div>

      {isFormOpen && (
        <PropertyForm
          initialValues={editingProperty}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      )}

      {isLoading ? (
        <p>読み込み中...</p>
      ) : properties.length === 0 ? (
        <p>登録されている物件はありません。</p>
      ) : (
        <div className="property-grid">
          {properties.map((property) => (
            <div className="property-card" key={property.id}>
              <h2>{property.name}</h2>
              <p className="property-rent">
                家賃：{property.rent.toLocaleString()} 円
              </p>
              <p className="property-area">エリア：{property.area}</p>
              <p className="property-layout">間取り：{property.layout}</p>
              {/* 編集・削除は登録者本人のみ操作できる（RLSでも本人以外は拒否される） */}
              {property.user_id === user.id && (
                <div className="property-card-buttons">
                  <button onClick={() => handleEditClick(property)}>編集</button>
                  <button onClick={() => handleDelete(property)}>削除</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
