import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type QRPopoverProps = {
  url: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function QRPopover({ url, open, setOpen }: QRPopoverProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>QR code?</DialogTitle>
          <DialogDescription>
            For the alias: <strong>{url}</strong>
          </DialogDescription>
        </DialogHeader>
        <div>
          {url && open && (
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}`}
              alt="QR code"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
