import InputItem from './InputItem'

const StakingInputCard = ({
  stakeTokens,
  unstakeTokens,
  airdropFreeForUser,
}) => {
  return (
    <div>
      <InputItem
        stakeTokens={stakeTokens}
        unstakeTokens={unstakeTokens}
        airdropFreeForUser={airdropFreeForUser}
      />
    </div>
  );
};

export default StakingInputCard