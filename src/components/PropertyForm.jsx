import { useEffect, useState } from 'react'

// 物件の新規登録・編集フォーム
// initialValuesがあれば編集、なければ新規登録として扱う
export function PropertyForm({ initialValues, onSubmit, onCancel, isSubmitting }) {
  const [name, setName] = useState('')
  const [rent, setRent] = useState('')
  const [area, setArea] = useState('')
  const [layout, setLayout] = useState('')

  // 編集対象が変わったらフォームの入力値を初期値に合わせる
  useEffect(() => {
    setName(initialValues?.name ?? '')
    setRent(initialValues?.rent ?? '')
    setArea(initialValues?.area ?? '')
    setLayout(initialValues?.layout ?? '')
  }, [initialValues])

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({
      name,
      rent: Number(rent),
      area,
      layout,
    })
  }

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <h2>{initialValues ? '物件を編集' : '物件を新規登録'}</h2>

      <label htmlFor="name">物件名</label>
      <input
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="rent">家賃（円）</label>
      <input
        id="rent"
        type="number"
        value={rent}
        onChange={(e) => setRent(e.target.value)}
        min={0}
        required
      />

      <label htmlFor="area">エリア</label>
      <input
        id="area"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        required
      />

      <label htmlFor="layout">間取り</label>
      <input
        id="layout"
        value={layout}
        onChange={(e) => setLayout(e.target.value)}
        placeholder="例：1LDK"
        required
      />

      <div className="property-form-buttons">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '保存中...' : '保存'}
        </button>
        <button type="button" onClick={onCancel} disabled={isSubmitting}>
          キャンセル
        </button>
      </div>
    </form>
  )
}
