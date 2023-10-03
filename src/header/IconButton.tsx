const IconButton: React.FC<{
  Icon: React.ElementType;
  label: string;
  onClick?: () => void;
}> = ({ Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="p-2 hover:bg-gray-200 rounded-xl flex flex-col items-center mx-2 px-4"
  >
    <Icon size={24} />
    <span className="text-xs mt-1">{label}</span>
  </button>
);

export default IconButton;
