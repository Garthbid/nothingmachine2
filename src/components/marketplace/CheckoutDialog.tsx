'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, CreditCard, Lock, Check, Loader2 } from 'lucide-react'

export function CheckoutDialog() {
  const { showCheckout, setShowCheckout, setShowMarketplace, purchaseTemplate } = useStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleBack = () => {
    setShowCheckout(false)
    setShowMarketplace(true)
  }

  const handlePurchase = async () => {
    setIsProcessing(true)
    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setIsComplete(true)
    // Wait a moment then complete
    await new Promise((resolve) => setTimeout(resolve, 1500))
    purchaseTemplate('richard')
  }

  const handleClose = () => {
    setShowCheckout(false)
    setIsComplete(false)
    setIsProcessing(false)
  }

  if (isComplete) {
    return (
      <Dialog open={showCheckout} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md bg-black border-neutral-800 font-mono">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-6 animate-in zoom-in duration-300">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-white">Purchase Complete!</h2>
            <p className="text-neutral-500 mb-4">
              Richard is now yours. Loading your soul files...
            </p>
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Initializing Nothing Machine...</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={showCheckout} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-black border-neutral-800 font-mono">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="w-8 h-8 text-neutral-400 hover:text-white hover:bg-neutral-900" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <DialogTitle className="text-xl text-white">Checkout</DialogTitle>
              <DialogDescription className="text-neutral-500">Complete your purchase</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          {/* Order Summary */}
          <div className="rounded-lg bg-neutral-900 border border-neutral-800 p-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center">
                <span className="text-3xl">🤖</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">Richard Template</h3>
                <p className="text-sm text-neutral-500">60 files • Full soul configuration</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-white">$1,000</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-300">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" defaultValue="justin@garthbid.com" className="bg-neutral-900 border-neutral-800 text-white" />
            </div>

            <Separator className="bg-neutral-800" />

            <div className="space-y-2">
              <Label htmlFor="card" className="flex items-center gap-2 text-neutral-300">
                <CreditCard className="w-4 h-4" />
                Card Information
              </Label>
              <Input id="card" placeholder="4242 4242 4242 4242" defaultValue="4242 4242 4242 4242" className="bg-neutral-900 border-neutral-800 text-white" />
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="MM / YY" defaultValue="12 / 28" className="bg-neutral-900 border-neutral-800 text-white" />
                <Input placeholder="CVC" defaultValue="424" className="bg-neutral-900 border-neutral-800 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-neutral-300">Name on card</Label>
              <Input id="name" placeholder="Full name" defaultValue="Justin Rogers" className="bg-neutral-900 border-neutral-800 text-white" />
            </div>
          </div>

          {/* Total */}
          <div className="mt-6 pt-4 border-t border-neutral-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-neutral-500">Subtotal</span>
              <span className="text-white">$1,000.00</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-neutral-500">Tax</span>
              <span className="text-white">$0.00</span>
            </div>
            <div className="flex items-center justify-between text-lg font-bold">
              <span className="text-white">Total</span>
              <span className="text-white">$1,000.00</span>
            </div>
          </div>

          {/* Purchase Button */}
          <Button
            className="w-full mt-6 h-12 text-lg bg-white text-black hover:bg-neutral-200"
            onClick={handlePurchase}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Pay $1,000.00
              </>
            )}
          </Button>

          <p className="text-xs text-center text-neutral-600 mt-4 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            Secured by Stripe. This is a demo checkout.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
