import GenerativeForm from "~/components/generative-form";

export default function Home() {
  return (
    <main className="min-h-screen grid grid-cols-2">
      <div className="border-l p-4">
        <GenerativeForm />
      </div>

      <div className="border-l p-4"></div>
    </main>
  );
}
