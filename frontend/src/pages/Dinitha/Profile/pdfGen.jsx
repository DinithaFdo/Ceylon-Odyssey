import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const generatePDF = (data, filename, type, userName, startDate, endDate, selectedType) => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(0);
    
    const title = type === 'wallet' ? 'Wallet Transactions' : 'Referral Logs';
    const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    doc.text(title, titleX, 10);
    
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(10, 15, 200, 15);
    
    let yPosition = 30;
    
    doc.setFontSize(16);
    doc.setTextColor(50);
    doc.setFont("helvetica", "normal");
    doc.text(`User: ${userName}`, 10, yPosition);
    
    yPosition += 10;

    if (startDate && endDate) {
        doc.text(`Time Period: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`, 10, yPosition);
        yPosition += 10;

        doc.text(`Transaction Type: ${selectedType}`, 10, yPosition);
        yPosition += 10;
    }
    
    const columns = type === 'wallet'
        ? [
            { header: 'Date', dataKey: 'date' },
            { header: 'Description', dataKey: 'type' },
            { header: 'Amount', dataKey: 'amount' },
            { header: 'Status', dataKey: 'status' },
          ]
        : [
            { header: 'Date', dataKey: 'date' },
            { header: 'Referred User', dataKey: 'referredUserName' },
            { header: 'Status', dataKey: 'status' },
          ];

    const rows = data.map(item => ({
        date: new Date(item.date).toLocaleDateString(),
        ...(type === 'wallet' ? {
            type: item.type,
            amount: `LKR ${item.amount}`,
            status: item.status || 'Success',
        } : {
            referredUserName: item.referredUserName,
            status: item.status || 'Success',
        }),
    }));

    doc.autoTable({
        columns,
        body: rows,
        startY: yPosition,
    });

    doc.save(filename);
};

export default generatePDF;
