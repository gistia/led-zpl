const RoundButton: React.FC<{
  Icon: React.ElementType;
  onClick?: () => void;
}> = ({ Icon, onClick }) => (
  <button onClick={onClick} className="p-2 hover:bg-gray-200 rounded-full">
    <Icon size={20} />
  </button>
);

export default RoundButton;
