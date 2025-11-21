import TextType from "@/components/TextType";

export default function Home() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div className="text-4xl md:text-5xl font-bold">
        <TextType
          text={["Hi there, how can we help you today?"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="_"
        />
      </div>
      <h4 className="text-xl md:text-2xl text-muted-foreground mt-4">
        Help us connect with your city
      </h4>
    </div>
  );
}
