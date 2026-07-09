import { useAuth } from '../contexts/AuthContext'

// 物件のダミーデータ
const dummyProperties = [
  { id: 1, name: 'サンシャイン麻布 101', rent: 128000, area: '東京都港区' },
  { id: 2, name: 'グリーンヒルズ渋谷 305', rent: 145000, area: '東京都渋谷区' },
  { id: 3, name: 'パークサイド新宿 502', rent: 98000, area: '東京都新宿区' },
  { id: 4, name: 'メゾン中目黒 210', rent: 165000, area: '東京都目黒区' },
  { id: 5, name: 'コーポ吉祥寺 108', rent: 87000, area: '東京都武蔵野市' },
  { id: 6, name: 'リバーサイド横浜 703', rent: 112000, area: '神奈川県横浜市' },
]

export function PropertyListPage() {
  const { user, signOut } = useAuth()

  return (
    <div className="property-page">
      <header className="property-header">
        <h1>物件一覧</h1>
        <div className="property-header-right">
          <span>{user?.email} でログイン中</span>
          <button onClick={signOut}>ログアウト</button>
        </div>
      </header>

      <div className="property-grid">
        {dummyProperties.map((property) => (
          <div className="property-card" key={property.id}>
            <h2>{property.name}</h2>
            <p className="property-rent">
              家賃：{property.rent.toLocaleString()} 円
            </p>
            <p className="property-area">エリア：{property.area}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
