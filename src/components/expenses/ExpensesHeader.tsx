import { useState } from 'react';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import FormModal, { FormField } from '../FormModal';

const ExpensesHeader = () => {
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

  // Available expense categories
  const expenseCategories = [
    'Grocery & Foods',
    'Shopping & Transportation',
    'Gifts and other items',
    'Utilities',
    'Housing',
    'Entertainment',
    'Health',
    'Education',
    'Personal',
    'Others',
  ];

  // Define the fields for the expenses form
  const expenseFormFields: FormField[] = [
    {
      id: 'name',
      label: 'Expense Name',
      type: 'text',
      placeholder: 'Enter expense name',
      validation: {
        required: 'Expense name is required',
        minLength: 3,
      },
    },
    {
      id: 'category',
      label: 'Category',
      type: 'select',
      options: expenseCategories.map(cat => ({ value: cat, label: cat })),
      validation: {
        required: 'Category is required',
      },
    },
    {
      id: 'date',
      label: 'Date',
      type: 'date',
      placeholder: 'Select date',
      validation: {
        required: 'Date is required',
      },
    },
    {
      id: 'amount',
      label: 'Amount (₦)',
      type: 'number',
      placeholder: '0.00',
      validation: {
        required: 'Amount is required',
        min: 0,
        custom: value => (value <= 0 ? 'Amount must be positive' : undefined),
      },
    },
    {
      id: 'description',
      label: 'Description (Optional)',
      type: 'textarea',
      placeholder: 'Add a description...',
      rows: 3,
    },
  ];

  // Function to handle form submission
  const handleAddExpense = (data: Record<string, any>) => {
    console.log('New expense added:', data);
    closeModal();
  };

  return (
    <>
      <header className="bg-gray-50 p-4 mt-2 flex flex-col gap-4">
        {/* Top Row: Search & Add Button */}
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
            <Button
              className="bg-blue-500 text-white px-10 py-6 mr-6 text-2xl rounded-md"
              onClick={openModal}
            >
              Add Expenses
            </Button>
          </div>
        </div>

        {/* Bottom Row: Title */}
        <div className="flex justify-between items-center">
          <h1 className="text-5xl font-bold">Monthly Budgets</h1>
        </div>
      </header>

      {/* Reusable Form Modal */}
      <FormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAddExpense}
        title="Add Expense"
        fields={expenseFormFields}
        submitLabel="Add Expense"
        initialValues={{ amount: 0 }}
      />
    </>
  );
};

export default ExpensesHeader;
