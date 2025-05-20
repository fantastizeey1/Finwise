import { useState } from 'react';
import { Search, Share } from 'lucide-react';
import { Button } from '../ui/button';
import AddBudgetModal from './AddBudgetModals';

const BudgetHeader = () => {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle opening the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle adding a budget
  interface BudgetData {
    name?: string; // Make 'name' optional to align with BudgetFormData
    amount: number;
    category: string;
    description?: string; // Add 'description' to match BudgetFormData
  }

  const handleAddBudget = (data: BudgetData) => {
    console.log('New budget added:', data);
    // Here you would typically update your state or call an API
    // to save the budget data
  };

  return (
    <>
      <header className="bg-gray-50 p-4 mt-2 flex flex-col gap-4">
        {/* Top Row: Search & Share */}
        <div className="flex justify-between items-center mb-4">
          <div className="relative flex items-center w-2/3">
            <input
              type="text"
              placeholder="Search Here"
              className="w-full p-7 rounded-lg border bg-white border-gray-200"
            />
            <button className="absolute right-5 inset-y-0 my-auto" title="Search">
              <Search size={25} className="text-gray-500" />
            </button>
          </div>
          <div className="flex items-center w-1/3 justify-end">
            <Button className="bg-blue-500 text-white px-10 py-6 mr-8 rounded-md text-2xl">
              Share <Share size={20} className="ml-2" />
            </Button>
          </div>
        </div>

        {/* Bottom Row: Title & Add Budget */}
        <div className="flex justify-between items-center">
          <h1 className="text-5xl font-bold">Monthly Budgets</h1>
          <Button
            className="bg-blue-500 text-white px-10 py-6 mr-6 text-2xl rounded-md"
            onClick={openModal} // Add onClick handler to open the modal
          >
            Add Budget
          </Button>
        </div>
      </header>

      {/* Include the AddBudgetModal component */}
      <AddBudgetModal isOpen={isModalOpen} onClose={closeModal} onAddBudget={handleAddBudget} />
    </>
  );
};

export default BudgetHeader;
