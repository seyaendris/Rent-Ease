"use client"

import { useRouter } from "next/navigation"
import Heading from "./Heading"
import Button from "./Button"

interface EmptyStateProps {
    title?: string
    subtitle?: string
    showReset?: boolean
}

const EmptyState:React.FC<EmptyStateProps> = ({
    title = 'No Exact Matches Found',
    subtitle = 'Try changing or removing some of your filters',
    showReset
}) => {
    const router = useRouter();
  return (
    <div className="h-[40vh] flex flex-col gap-2 justify-center items-center bg-neutral-50 mx-10 md:mx-52 mt-32 rounded-xl">
      <Heading 
        title={title}
        subtitle={subtitle}
        center
        />

        <div  className="w-48 mt-4">
            {showReset && (
                <Button 
                    outline
                    label="Remove all filters"
                    onClick={() => router.push('/')}
                    />
            )}

        </div>
    </div>

    
  )
}

export default EmptyState
