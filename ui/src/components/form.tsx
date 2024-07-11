import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useWriteContract, useChainId } from 'wagmi';
import { parseEther } from 'viem';
import { cn, getChainData } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { abi } from "@/lib/abi";
import { contractAddress } from "@/lib/constants";

const FormSchema = z.object({
  commitAmount: z.string().refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
    { message: "Must be a non-negative number" }
  ),
  commitDate: z.date({
    required_error: "A commit date is required.",
  }),
});

export function CommitForm({ onTransactionComplete, onTransactionSubmit }) {
  const [price, setPrice] = useState(null);
  const [usdEquivalent, setUsdEquivalent] = useState(0);
  const today = new Date();
  const tomorrow = addDays(today, 1);
  
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      commitDate: tomorrow,
      commitAmount: "",
    }
  });

  const { watch, setValue } = form;
  const commitAmount = watch("commitAmount");

  const chainId = useChainId();
  const { tokenSymbol, currencyId } = getChainData(chainId);

  useEffect(() => {
    async function fetchPriceData() {
      try {  
        const response = await fetch(`/api/price?currency=${currencyId}`);
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setPrice(data.data.amount);
      } catch (error) {
        console.error('Failed to fetch price data:', error);
        toast({
          title: "Error",
          description: `Failed to fetch current ${tokenSymbol} price. Please try again later.`,
          variant: "destructive",
        });
      }
    }
    fetchPriceData();
  }, [currencyId, tokenSymbol]);

  useEffect(() => {
    if (price && commitAmount) {
      const numericAmount = parseFloat(commitAmount);
      if (!isNaN(numericAmount)) {
        setUsdEquivalent((numericAmount * price).toFixed(2));
      }
    }
  }, [price, commitAmount]);
  
  const { isSuccess, isError, writeContract } = useWriteContract();

  function onSubmit(data) {
    // Set the time to the end of the day (23:59:59.999)
    const endOfDay = new Date(data.commitDate);
    endOfDay.setHours(23, 59, 59, 999);
    const unixTimestamp = BigInt(Math.floor(endOfDay.getTime() / 1000));
    console.log(unixTimestamp)
    writeContract({
      abi,
      address: contractAddress,
      functionName: 'commitRun',
      args: [unixTimestamp],
      value: parseEther(data.commitAmount),
    });
    onTransactionSubmit();
  }

  useEffect(() => {
    isSuccess && onTransactionComplete("success")
    isError && onTransactionComplete("error")
  }, [isSuccess, isError]);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Commit form</CardTitle>
        <CardDescription>Specify the conditions of the run you'd like to commit to.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="commitAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="0.01" 
                        autoComplete='off'
                        {...field} 
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || /^\d*\.?\d*$/.test(value)) {
                            setValue("commitAmount", value);
                          }
                        }}
                      />
                      <Badge className="absolute right-3 top-1/2 transform -translate-y-1/2">{tokenSymbol}</Badge>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Amount to commit to the run. 
                    {usdEquivalent > 0 && <span> (≈ ${usdEquivalent} USD)</span>}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="commitDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Complete by</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Date to complete your run by.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}