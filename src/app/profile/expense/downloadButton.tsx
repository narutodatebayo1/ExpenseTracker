"use client"

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { getExpenseByUserId } from "../../../../hook/expenseHook";
import { IExpense } from "../../../../interface/expenseInterface";
import styles from "@/style/expense.module.css"

export default function DownloadButton({ userId }: { userId: string }) {

    const [expenses, SetExpenses] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const res = await getExpenseByUserId(userId, timezone)
            SetExpenses(res)
        }

        fetchData()

    }, [])

    const onGetExporProduct = async (title?: string, worksheetname?: string) => {
        try {
            setLoading(true);
            
            // Check if the action result contains data and if it's an array
            if (expenses && Array.isArray(expenses)) {
                const dataToExport = expenses.map((expense: IExpense) => ({
                        Date: expense.date,
                        Category: expense.expenseType.title,
                        Amount: expense.amount.toString(),
                        Description: expense.description
                    })
                );
                // Create Excel workbook and worksheet
                const workbook = XLSX.utils.book_new();
                const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
                XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
                // Save the workbook as an Excel file

                const dateLength = 10
                let categoryLength = 8
                let amountLength = 8 // harusnya 6
                let descriptionLength = 11

                expenses.forEach((expense: IExpense) => {

                    const tempCategory = expense.expenseType.title.length
                    const tempAmount = expense.amount.toString().length
                    const tempDescription = expense.description.length

                    if(tempCategory > categoryLength) categoryLength = tempCategory
                    if(tempAmount > amountLength) amountLength = tempAmount
                    if(tempDescription > descriptionLength) descriptionLength = tempDescription

                })

                const colWidths = [
                    { wch: dateLength },
                    { wch: categoryLength },
                    { wch: amountLength },
                    { wch: descriptionLength },
                ]

                worksheet['!cols'] = colWidths

                XLSX.writeFile(workbook, `${title}.xlsx`);
                console.log(`Exported data to ${title}.xlsx`);
                setLoading(false);
            } else {
                setLoading(false);
                console.log("#==================Export Error")
            }
        } catch (error: any) {
            setLoading(false);
            console.log("#==================Export Error", error.message);
        }
    };

    return <button onClick={() => onGetExporProduct('Expenses', 'WorkSheet')} className={styles.downloadButton}>{loading ? "Loading..." : "Download"}</button>
}