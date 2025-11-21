import TextType from '../TextType';

export default function TextTypeExample() {
  return (
    <div className="flex items-center justify-center min-h-[200px] bg-background p-8">
      <div className="text-4xl font-bold">
        <TextType 
          text={["Hi there, how can we help you today?"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="_"
        />
      </div>
    </div>
  );
}
