// This context has been temporarily removed
// Will be reimplemented in the future
import { createContext, useContext } from 'react';

const PeerReviewContext = createContext<any>(null);

export function PeerReviewProvider({ children }: { children: React.ReactNode }) {
  return (
    <PeerReviewContext.Provider value={null}>
      {children}
    </PeerReviewContext.Provider>
  );
}

export function usePeerReview() {
  return useContext(PeerReviewContext);
}