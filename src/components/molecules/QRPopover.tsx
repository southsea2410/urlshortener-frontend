export default function QRPopover({ url }: { url: string }) {
  return (
    <div>
      {url && (
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}`}
          alt="QR code"
        />
      )}
    </div>
  );
}
