import AuthButton from '@/components/auth-button';

export default function TodosLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <AuthButton />
          </div>
        </nav>
      </div>

      {children}

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        FOOTER
      </footer>
    </div>
  );
}
