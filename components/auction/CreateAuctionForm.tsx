/**
 * CreateAuctionForm Component
 *
 * Multi-step wizard for creating new auctions:
 * - Step 1: Basic Info (auction token, payment token)
 * - Step 2: Price Configuration (start, floor, decrement, interval)
 * - Step 3: Supply & Duration
 * - Form validation with helpful error messages
 * - Live preview of auction settings
 *
 * @example
 * ```tsx
 * <CreateAuctionForm
 *   chain={SUPPORTED_CHAIN.POLYGON_AMOY}
 *   onSuccess={(auctionAddress) => {
 *     router.push(`/auction/${auctionAddress}`);
 *   }}
 * />
 * ```
 */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { parseEther, type Address, isAddress } from 'viem';
import { ArrowLeft, ArrowRight, CheckCircle2, Coins, Clock, Package } from 'lucide-react';
import { SUPPORTED_CHAIN } from '@/types/blockchain';
import { useCreateAuction } from '@/hooks/useCreateAuction';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { cn } from '@/lib/utils/index';

// Form schema
const createAuctionSchema = z.object({
  auctionToken: z.string().refine((val) => isAddress(val), {
    message: 'Invalid token address',
  }),
  paymentToken: z.string().refine((val) => isAddress(val), {
    message: 'Invalid token address (use 0x0000000000000000000000000000000000000000 for native token)',
  }),
  startPrice: z.string().min(1, 'Start price is required'),
  floorPrice: z.string().min(1, 'Floor price is required'),
  priceDecrement: z.string().min(1, 'Price decrement is required'),
  priceInterval: z.string().min(1, 'Price interval is required'),
  totalSupply: z.string().min(1, 'Total supply is required'),
  duration: z.string().min(1, 'Duration is required'),
}).refine((data) => {
  const start = parseFloat(data.startPrice);
  const floor = parseFloat(data.floorPrice);
  return start >= floor;
}, {
  message: 'Start price must be greater than or equal to floor price',
  path: ['startPrice'],
});

type CreateAuctionFormData = z.infer<typeof createAuctionSchema>;

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000' as Address;

export interface CreateAuctionFormProps {
  /** Chain to create auction on */
  chain: SUPPORTED_CHAIN;
  /** Success callback with created auction address */
  onSuccess?: (auctionAddress: Address) => void;
  /** Optional className */
  className?: string;
}

export function CreateAuctionForm({
  chain,
  onSuccess,
  className,
}: CreateAuctionFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const { createAuction, isLoading, error, auctionAddress } = useCreateAuction(chain);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<CreateAuctionFormData>({
    resolver: zodResolver(createAuctionSchema),
    defaultValues: {
      paymentToken: ZERO_ADDRESS,
    },
  });

  const formData = watch();
  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const nextStep = async () => {
    let fieldsToValidate: (keyof CreateAuctionFormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ['auctionToken', 'paymentToken'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['startPrice', 'floorPrice', 'priceDecrement', 'priceInterval'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: CreateAuctionFormData) => {
    try {
      const address = await createAuction({
        auctionToken: data.auctionToken as Address,
        paymentToken: data.paymentToken as Address,
        startPrice: parseEther(data.startPrice),
        floorPrice: parseEther(data.floorPrice),
        priceDecrement: parseEther(data.priceDecrement),
        priceInterval: BigInt(parseInt(data.priceInterval)),
        totalSupply: BigInt(parseInt(data.totalSupply)),
        duration: BigInt(parseInt(data.duration) * 3600), // Convert hours to seconds
      });

      toast.success('Auction created successfully!', {
        description: `Auction address: ${address.slice(0, 10)}...`,
      });

      onSuccess?.(address);
    } catch (err) {
      toast.error('Failed to create auction', {
        description: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-6', className)}>
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Step {currentStep} of {totalSteps}</span>
          <span className="font-medium">{progress.toFixed(0)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Content */}
      <Card variant="gradient">
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && 'Token Configuration'}
            {currentStep === 2 && 'Price Configuration'}
            {currentStep === 3 && 'Supply & Duration'}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && 'Configure the tokens for your auction'}
            {currentStep === 2 && 'Set pricing parameters for the Dutch auction'}
            {currentStep === 3 && 'Define supply and auction duration'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Step 1: Token Configuration */}
          {currentStep === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="auctionToken">
                  Auction Token Address *
                </Label>
                <Input
                  id="auctionToken"
                  placeholder="0x..."
                  {...register('auctionToken')}
                  aria-invalid={!!errors.auctionToken}
                />
                {errors.auctionToken && (
                  <p className="text-sm text-destructive">{errors.auctionToken.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  The token you want to sell in this auction
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentToken">
                  Payment Token Address *
                </Label>
                <Input
                  id="paymentToken"
                  placeholder="0x0000000000000000000000000000000000000000 for native token"
                  {...register('paymentToken')}
                  aria-invalid={!!errors.paymentToken}
                />
                {errors.paymentToken && (
                  <p className="text-sm text-destructive">{errors.paymentToken.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Token buyers will pay with (use zero address for native token like ETH)
                </p>
              </div>
            </>
          )}

          {/* Step 2: Price Configuration */}
          {currentStep === 2 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startPrice">
                    Start Price (ETH) *
                  </Label>
                  <Input
                    id="startPrice"
                    type="number"
                    step="0.001"
                    placeholder="1.0"
                    {...register('startPrice')}
                    aria-invalid={!!errors.startPrice}
                  />
                  {errors.startPrice && (
                    <p className="text-sm text-destructive">{errors.startPrice.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="floorPrice">
                    Floor Price (ETH) *
                  </Label>
                  <Input
                    id="floorPrice"
                    type="number"
                    step="0.001"
                    placeholder="0.1"
                    {...register('floorPrice')}
                    aria-invalid={!!errors.floorPrice}
                  />
                  {errors.floorPrice && (
                    <p className="text-sm text-destructive">{errors.floorPrice.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priceDecrement">
                    Price Decrement (ETH) *
                  </Label>
                  <Input
                    id="priceDecrement"
                    type="number"
                    step="0.001"
                    placeholder="0.05"
                    {...register('priceDecrement')}
                    aria-invalid={!!errors.priceDecrement}
                  />
                  {errors.priceDecrement && (
                    <p className="text-sm text-destructive">{errors.priceDecrement.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Amount price decreases each interval
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priceInterval">
                    Price Interval (seconds) *
                  </Label>
                  <Input
                    id="priceInterval"
                    type="number"
                    placeholder="300"
                    {...register('priceInterval')}
                    aria-invalid={!!errors.priceInterval}
                  />
                  {errors.priceInterval && (
                    <p className="text-sm text-destructive">{errors.priceInterval.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Time between price decreases (e.g., 300 = 5 min)
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Step 3: Supply & Duration */}
          {currentStep === 3 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="totalSupply">
                  Total Supply *
                </Label>
                <Input
                  id="totalSupply"
                  type="number"
                  placeholder="1000"
                  {...register('totalSupply')}
                  aria-invalid={!!errors.totalSupply}
                />
                {errors.totalSupply && (
                  <p className="text-sm text-destructive">{errors.totalSupply.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Total number of tokens available in the auction
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">
                  Duration (hours) *
                </Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="24"
                  {...register('duration')}
                  aria-invalid={!!errors.duration}
                />
                {errors.duration && (
                  <p className="text-sm text-destructive">{errors.duration.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  How long the auction will run (e.g., 24 = 24 hours)
                </p>
              </div>

              {/* Preview Summary */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg space-y-2">
                <p className="text-sm font-medium">Auction Summary:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Coins className="w-3 h-3 text-muted-foreground" />
                    <span>Price: {formData.startPrice || '?'} → {formData.floorPrice || '?'} ETH</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="w-3 h-3 text-muted-foreground" />
                    <span>Supply: {formData.totalSupply || '?'} tokens</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span>Duration: {formData.duration || '?'} hours</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-destructive/10 rounded-lg">
              <p className="text-sm text-destructive">{error.message}</p>
            </div>
          )}

          {/* Success Display */}
          {auctionAddress && (
            <div className="p-3 bg-primary/10 rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <p className="text-sm">Auction created: {auctionAddress.slice(0, 10)}...</p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1 || isLoading}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={nextStep}
              disabled={isLoading}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isLoading || !!auctionAddress}
            >
              {isLoading ? 'Creating...' : auctionAddress ? 'Created!' : 'Create Auction'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </form>
  );
}
