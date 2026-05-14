export const generatePDF = async (elementId: string, fileName: string = 'document.pdf') => {
  try {
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.getElementById(elementId);
    if (!element) throw new Error(`Element not found: ${elementId}`);
    await html2pdf().set({ margin: 10, filename: fileName, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' } }).from(element).save();
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
