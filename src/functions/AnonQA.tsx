export default function AnonymousQuestionForm() {
  return (
    <form
      method="POST"
      action="/api/questions"
      className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow space-y-4"
    >
      <h3 className="text-lg font-semibold">
        Ask a question (anonymous)
      </h3>

      <p className="text-sm text-gray-500">
        No name, no email. Just the question.
      </p>

      <textarea
        name="question"
        required
        rows={5}
        placeholder="Type your question here..."
        className="w-full p-3 border rounded-md focus:outline-none focus:ring"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
      >
        Submit
      </button>
    </form>
  );
}
