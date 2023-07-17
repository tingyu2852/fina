import XLSX from '../../node_modules/xlsx'

function exportExcel(arrayData, titleData, fileName) {
    // 创建Excel表格对象
    
    const worksheet = XLSX.utils.json_to_sheet(arrayData);
    
    // 给第一行打上标题
    const header = titleData || [];
    const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
    for (let colIndex = headerRange.s.c; colIndex <= headerRange.e.c; colIndex++) {
      const address = XLSX.utils.encode_col(colIndex) + '1';
      if (!worksheet[address]) continue;
      worksheet[address].v = header[colIndex - headerRange.s.c];
    }
  
    // 将表格对象放入工作簿对象
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
    // 导出Excel文件
    XLSX.writeFile(workbook, fileName + '.xlsx');
  }
  
  // 导出函数
  export default exportExcel;