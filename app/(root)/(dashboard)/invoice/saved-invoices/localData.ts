export const getSavedInvoices = () => {
  try {
    const savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
    return savedInvoices;
  } catch (error) {
    console.error('Error retrieving saved invoices:', error);
    return [];
  }
};
