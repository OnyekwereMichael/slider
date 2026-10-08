'use client' // is needed only if you’re using React Server Components
import { FileUploaderMinimal } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';
import React from 'react'
type Props = {
    contentId: string
    onContentChange: (args: {
        contentId: string
        newContent: string | string[][] | string[]
    }) => void
    src?: string
}
const UploadImage = ({ contentId, onContentChange }: Props) => {
    const handleChangeEvent = (e: any) => {
        if (onContentChange && e.successEntries && e.successEntries.length > 0) {
            onContentChange({ contentId, newContent: e.successEntries[0].cdnUrl })
        }
    }
    return (
        <div>
            <FileUploaderMinimal
                sourceList='local, url, dropdown'
                classNameUploader="uc-light"
                pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY!}
                multiple={false}
                onChange={handleChangeEvent}
                maxLocalFileSizeBytes={10000000}
            />
        </div>
    )
}
export default UploadImage