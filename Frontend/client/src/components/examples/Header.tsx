import Header from '../Header';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ClerkProvider } from '@clerk/clerk-react';

const MOCK_CLERK_KEY = 'pk_test_mock';

export default function HeaderExample() {
  return (
    <ClerkProvider publishableKey={MOCK_CLERK_KEY}>
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="p-8">
            <p className="text-center text-muted-foreground">Header component demo</p>
          </div>
        </div>
      </ThemeProvider>
    </ClerkProvider>
  );
}
