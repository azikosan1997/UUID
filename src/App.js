import './App.css';
import {useState} from "react";
import * as XLSX from 'xlsx';

function App() {
    const [inputText, setInputText] = useState('');
    const [secondParts, setSecondParts] = useState([]);
    const [disabled, setDisabled] = useState(true);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const truncateAndSave = () => {
        const lines = inputText.split('\n');
        const truncatedArray = lines.map((line) => {
            const [, secondPart] = line.split('_');
            return secondPart;
        });

        setSecondParts(truncatedArray);
        setDisabled(false)
    };

    const exportToExcel = () => {
        const data = secondParts.map((part, index) => [index + 1, part]);
        const ws = XLSX.utils.aoa_to_sheet(data);

        const columnWidths = data[0].map((col, index) => ({
            wch: col.toString().length + 2,
        }));

        ws['!cols'] = columnWidths;

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'UUIDs');
        XLSX.writeFile(wb, 'uuids.xlsx');
    };
    return (
        <div className="container">
            <section>
                <h1>Приветствую вас в нашем удивительном приложении! 😊🚀</h1>
                <div className="subtitle">
                    Наше приложение создано специально для того, чтобы сделать процесс извлечения
                    UUID из текста максимально простым и удобным. Теперь вы с легкостью сможете выделить уникальные
                    идентификаторы в тексте, делая ваш опыт работы с данными ещё более эффективным. 🚀💻
                </div>
                <textarea
                    value={inputText}
                    onChange={handleInputChange}
                    cols="30"
                    rows="10"
                    placeholder="Поставьте текс с UUID"></textarea>
                <div className="action">
                    <button type="button" onClick={truncateAndSave}>Посмотреть как список</button>
                    <button type="button" style={disabled ? { backgroundColor: "#efefef", cursor: "not-allowed" }
                        : { backgroundColor: "#ffcf0f", cursor: "pointer" } } onClick={exportToExcel}
                            disabled={disabled === true && inputText.length > 0}>Загрузить Excel файл
                    </button>
                </div>
                <div className="spliter">
                    {inputText.length > 0 && (
                        <div>
                            <ul>
                                {secondParts.map((part, index) => (
                                    <li key={index}>{part}</li>
                                ))}
                            </ul>
                            <div>
                                <ol>
                                    {secondParts.map((part, index) => (
                                        <li key={index}>{part}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default App;
