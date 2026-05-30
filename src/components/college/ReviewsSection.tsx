'use client';

import { Star, MessageSquare, Plus, Minus, Info } from 'lucide-react';
import type { Review } from '@/types';

interface ReviewsSectionProps {
  reviews: Review[];
  overallRating: number;
}

export default function ReviewsSection({ reviews, overallRating }: ReviewsSectionProps) {
  const totalReviews = reviews.length;

  return (
    <div className="space-y-8">
      {/* Overall rating card summary */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-6">
        <div className="mb-4 sm:mb-0 text-center sm:text-left">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Overall Rating
          </p>
          <div className="mt-2 flex items-center justify-center sm:justify-start gap-4">
            <span className="text-5xl font-extrabold text-gray-900">
              {overallRating.toFixed(1)}
            </span>
            <div>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(overallRating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Based on {totalReviews} student reviews
              </p>
            </div>
          </div>
        </div>

        {/* Note on submit form */}
        <div className="flex gap-3 rounded-xl bg-indigo-50 border border-indigo-100 p-4 sm:max-w-md">
          <Info className="h-5 w-5 shrink-0 text-indigo-600 mt-0.5" />
          <div className="text-sm text-indigo-900 leading-relaxed">
            <span className="font-semibold block">Submit Review</span>
            Online review submission forms are coming in a future platform update. Currently, reviews are verified manually by CampusIQ admins.
          </div>
        </div>
      </div>

      {/* Reviews list */}
      {totalReviews === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-12 text-center">
          <MessageSquare className="h-8 w-8 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No reviews yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Be the first to share your experience with this college!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => {
            const dateStr = review.createdAt
              ? new Date(review.createdAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Recently';

            return (
              <div
                key={review.id}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                {/* Header */}
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.authorName}</h4>
                    <p className="text-xs text-gray-500">{dateStr}</p>
                  </div>
                  <div className="flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-sm font-bold text-amber-600">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    <span>{review.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Content */}
                <p className="text-sm leading-relaxed text-gray-600">{review.content}</p>

                {/* Pros & Cons */}
                {(review.pros || review.cons) && (
                  <div className="mt-4 grid grid-cols-1 gap-4 border-t border-gray-100 pt-4 sm:grid-cols-2">
                    {review.pros && (
                      <div className="rounded-lg bg-emerald-50/50 border border-emerald-100 p-3">
                        <div className="mb-1.5 flex items-center gap-1 text-xs font-bold uppercase text-emerald-800 tracking-wider">
                          <Plus className="h-3.5 w-3.5 text-emerald-600 stroke-[3px]" />
                          <span>Pros</span>
                        </div>
                        <p className="text-xs leading-relaxed text-emerald-900">{review.pros}</p>
                      </div>
                    )}

                    {review.cons && (
                      <div className="rounded-lg bg-rose-50/50 border border-rose-100 p-3">
                        <div className="mb-1.5 flex items-center gap-1 text-xs font-bold uppercase text-rose-800 tracking-wider">
                          <Minus className="h-3.5 w-3.5 text-rose-600 stroke-[3px]" />
                          <span>Cons</span>
                        </div>
                        <p className="text-xs leading-relaxed text-rose-900">{review.cons}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
