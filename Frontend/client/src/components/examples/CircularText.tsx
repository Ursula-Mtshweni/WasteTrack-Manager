import CircularText from '../CircularText';

export default function CircularTextExample() {
  return (
    <div className="flex items-center justify-center min-h-[200px] bg-background">
      <CircularText
        text="SAVE*YOUR*AFRICAN*FUTURE*"
        onHover="speedUp"
        spinDuration={20}
      />
    </div>
  );
}
