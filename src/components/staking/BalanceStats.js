export default function BalanceStats({
    tetherBalance,
    izineyBalance,
    stakingBalance
}) {
return (
    <div>
    <h3 className="text-lg leading-6 text-gray-900 text-3xl font-bold mb-5">🚀 Iziney - DeFi Staking Protocol</h3>
    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        
        <div  className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">💲 USDT</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{tetherBalance}</dd>
        </div>
        <div  className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">💲 IZIN COIN</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{izineyBalance}</dd>
        </div>
        <div  className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">💲 Staking Balance</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{stakingBalance}</dd>
        </div>
        
    </dl>
    </div>
)
}