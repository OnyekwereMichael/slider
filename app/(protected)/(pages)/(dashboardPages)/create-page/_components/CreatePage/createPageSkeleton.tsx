import React from 'react'

const CreatePageSkeleton = () => {
    return (
        <div className="w-full max-w-4xl mx-auto p-6 space-y-6 animate-pulse">
            {/* Header */}
            <div className="space-y-2">
                <div className="h-7 w-1/3 bg-background-80 rounded-md" />
                <div className="h-4 w-1/2 bg-background-80 rounded-md" />
            </div>

            {/* Form fields */}
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="h-4 w-24 bg-background-80 rounded-md" />
                    <div className="h-10 w-full bg-background-80 rounded-md" />
                </div>

                <div className="space-y-2">
                    <div className="h-4 w-24 bg-background-80 rounded-md" />
                    <div className="h-24 w-full bg-background-80 rounded-md" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="h-4 w-20 bg-background-80 rounded-md" />
                        <div className="h-10 w-full bg-background-80 rounded-md" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 w-20 bg-background-80 rounded-md" />
                        <div className="h-10 w-full bg-background-80 rounded-md" />
                    </div>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-4">
                <div className="h-10 w-24 bg-background-80 rounded-md" />
                <div className="h-10 w-32 bg-background-80 rounded-md" />
            </div>
        </div>
    )
}

export default CreatePageSkeleton