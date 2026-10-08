import { useSlideStore } from '@/app/store/useSlideStore'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Layout, PanelSize } from 'react-resizable-panels'
import React, { useEffect, useState } from 'react'

interface TableComponentProps {
    content: string[][]
    onchange: (newContent: string[][]) => void
    isEditable: boolean
    isPreview?: boolean
    initialRowSize?: number
    initialColSize?: number
}
const Table = ({ content, onchange, isEditable, isPreview, initialRowSize, initialColSize }:
    TableComponentProps) => {
    const [colSize, setColSize] = useState<number[]>([])
    const [rowSize, setRowSize] = useState<number[]>([])
    const { currentTheme } = useSlideStore()
    const [tableData, setTableData] = useState<string[][]>(() => {
        if (content.length === 0 || content[0].length === 0) {
            return Array(initialRowSize).fill(Array(initialColSize).fill(''))
        }
        return content
    })
    const handleResizeCol = (index: number, size: number) => {
        if (!isEditable) return
        const newSizes = [...colSize]
        newSizes[index] = size
        setColSize(newSizes)
    }

    const updateCell = (rowIndex: number, colIndex: number, value: string) => {
        if (!isEditable) return
        const newData = tableData.map((row, rIndex) =>
            rIndex === rowIndex
                ? row.map((cell, cIndex) => (cIndex === colIndex ? value : cell))
                : row
        )
        setTableData(newData)
        onchange(newData)
    }

    useEffect(() => {
        setRowSize(new Array(tableData.length).fill(100 / tableData.length))
        setColSize(new Array(tableData[0].length).fill(100 / tableData[0].length))
    }, [tableData])


    if (isPreview) {
        return (
            <div className='w-full h-full overflow-x-auto text-xs'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            {tableData[0].map((cell, index) => (
                                <th
                                    key={index}
                                    className='p-2 border'
                                    style={{ width: `${colSize[index]}%` }}
                                >
                                    {cell || 'Type here'}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>

                        {tableData.slice(1).map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                style={{ height: `${rowSize[rowIndex]}%` }}
                            >
                                {row.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className='p-2 border'
                                        style={{ width: `${colSize[cellIndex]}%` }}
                                    >
                                        {cell || 'Type here'}
                                    </td>
                                ))}
                            </tr>
                        ))}

                    </tbody>
                </table>

            </div>
        )
    }

    return (
        <div className='w-full h-full relative'
            style={{
                background: currentTheme.gradientBackground || currentTheme.backgroundColor,
                borderRadius: '8px'
            }}
        >
            <ResizablePanelGroup
                orientation='vertical'
                className={`w-full h-full rounded-lg border ${initialColSize === 2
                    ? 'min-h-[100px]'
                    : initialColSize === 3
                        ? 'min-h-[150px]'
                        : initialColSize === 4
                            ? 'min-h-[200px]'
                            : 'min-h-[100px]'
                    }`}
                onLayoutChange={(layout: Layout) => setRowSize(Object.values(layout))}

            >
                {tableData.map((row, rowIndex) => {
                    return (
                        <React.Fragment key={rowIndex}>
                            {rowIndex > 0 && <ResizableHandle />}
                            <ResizablePanelGroup
                                orientation='horizontal'
                                onLayoutChange={(layout: Layout) => setColSize(Object.values(layout))}
                                className='w-ful h-full'
                            >
                                {row.map((cell, colIndex) => (
                                    <React.Fragment key={colIndex}>
                                        {colIndex > 0 && <ResizableHandle />}
                                        <ResizablePanel
                                            defaultSize={colSize[colIndex]}
                                            onResize={(panelSize: PanelSize) => handleResizeCol(colIndex, panelSize.asPercentage)}
                                            className='w-full h-full min-h-9'
                                        >
                                            <div className='relative w-full h-full min-h-3'>
                                                <input
                                                    value={cell}
                                                    onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                                                    className='w-full h-full p-4 bg-transparent focus:ring-blue-500 rounded-md'
                                                    style={{ color: currentTheme.fontColor }}
                                                    placeholder='Type here'
                                                    readOnly={!isEditable}

                                                ></input>

                                            </div>



                                        </ResizablePanel>
                                    </React.Fragment>
                                ))}

                            </ResizablePanelGroup>
                        </React.Fragment>
                    )
                })}
            </ResizablePanelGroup>

        </div>
    )
}

export default Table