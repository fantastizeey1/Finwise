import Card from '../ui/Card';

export interface BudgetCard {
  icon?: React.ReactNode;
  title: string;
  amount: number;
}

const BudgetCards = ({ cards }: { cards: BudgetCard[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-8">
      {cards.map((card, idx) => (
        <Card
          key={idx}
          className="p-6 flex flex-col justify-between items-center h-full shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl bg-white"
        >
          {card.icon && (
            <div className="w-16 h-16 mb-4 text-blue-600 flex items-center justify-center bg-blue-100 rounded-lg">
              {card.icon}
            </div>
          )}
          <h3 className="text-[16px] text-gray-500 mb-1 font-medium uppercase tracking-normal">
            {card.title}
          </h3>
          <div className="text-3xl font-bold text-black">₦{card.amount}</div>
        </Card>
      ))}
    </div>
  );
};

export default BudgetCards;
