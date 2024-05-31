const xlsx = require("xlsx");

// 讀取 Excel 文件
const workbook = xlsx.readFile(
  "/Users/shihpoan/Desktop/專案/淡江畢業典禮2024/tku.graduation.node/students.xlsx"
);

// 獲取第一個工作表名稱
const sheetName = workbook.SheetNames[0];

// 獲取第一個工作表
const worksheet = workbook.Sheets[sheetName];

// 將工作表內容轉換為 JSON
const data = xlsx.utils.sheet_to_json(worksheet);

// 定義每次輸出多少條記錄
const chunkSize = 100;

// 將數據分成塊
for (let i = 0; i < data.length; i += chunkSize) {
  const chunk = data.slice(i, i + chunkSize);
  console.log(`Chunk ${i / chunkSize + 1}:`, chunk);
}
