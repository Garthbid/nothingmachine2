'use client'

import { useStore } from '@/lib/store'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FileText, ShoppingBag, ArrowRight } from 'lucide-react'

interface BuildMachineDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BuildMachineDialog({ open, onOpenChange }: BuildMachineDialogProps) {
  const { setShowMarketplace, startFromScratch } = useStore()

  const handleStartFromScratch = () => {
    startFromScratch()
    onOpenChange(false)
  }

  const handlePurchaseTemplate = () => {
    setShowMarketplace(true)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md overflow-hidden bg-black border-neutral-800 font-mono">
        <DialogHeader>
          <DialogTitle className="text-center text-xl text-white">Build Your Machine</DialogTitle>
          <DialogDescription className="text-center text-neutral-500">
            Choose how you want to start
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-6">
          <Button
            variant="outline"
            className="h-auto p-4 flex flex-col items-center gap-2 border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900 transition-all w-full bg-transparent"
            onClick={handleStartFromScratch}
          >
            <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
              <FileText className="w-5 h-5 text-neutral-400" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-white">Start from Scratch</h3>
              <p className="text-xs text-neutral-500 mt-1">
                Build your own soul files and memory
              </p>
            </div>
            <span className="text-xs text-neutral-600">Free</span>
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-neutral-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-neutral-600">or</span>
            </div>
          </div>

          <Button
            className="h-auto p-4 flex flex-col items-center gap-2 bg-white hover:bg-neutral-200 text-black border-0 w-full"
            onClick={handlePurchaseTemplate}
          >
            <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-black" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold flex items-center gap-2 justify-center">
                Browse Identity Marketplace
                <ArrowRight className="w-4 h-4" />
              </h3>
              <p className="text-xs text-black/60 mt-1">
                Pre-built cognition & identity systems
              </p>
            </div>
            <span className="text-xs text-black/60">Starting at $99</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
