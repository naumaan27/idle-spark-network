import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, FileText, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ExportModal = ({ open, onOpenChange }: ExportModalProps) => {
  const { toast } = useToast();

  const handleExport = (type: string) => {
    toast({
      title: "Export Started",
      description: `Generating ${type} report... Download will begin shortly.`,
    });
    
    // Simulate file download
    setTimeout(() => {
      const blob = new Blob([`Green Connect ${type} Report\nGenerated: ${new Date().toISOString()}\n\nESG Impact Data:\n- CO₂ Saved: 125.8 tons\n- Active Devices: 12,453\n- Tasks Completed: 567,890`], 
        { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `green-connect-${type.toLowerCase()}-${new Date().toISOString().split('T')[0]}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Reports</DialogTitle>
          <DialogDescription>
            Download comprehensive reports for ESG compliance and analysis
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Button variant="eco" className="w-full justify-start" onClick={() => handleExport('ESG')}>
            <FileText className="h-4 w-4 mr-2" />
            ESG Impact Report (PDF)
          </Button>
          <Button variant="eco-soft" className="w-full justify-start" onClick={() => handleExport('Analytics')}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics Dashboard (CSV)
          </Button>
          <Button variant="eco-soft" className="w-full justify-start" onClick={() => handleExport('Summary')}>
            <Download className="h-4 w-4 mr-2" />
            Executive Summary (TXT)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportModal;