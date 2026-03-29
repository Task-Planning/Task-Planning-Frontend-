export default function AssignedToMePage() {
  return (
    <div className=" mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Assigned to Me</h1>
        <p className="text-slate-500">Tasks and invitations from your teams</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm min-h-[400px]">
        <div className="p-6 border-b border-slate-200">
          <h2 className="font-bold text-slate-800">Assigned Tasks (0)</h2>
        </div>

        <div className="flex flex-col items-center justify-center py-32">
          <p className="text-slate-400 font-medium">
            No tasks assigned to you yet
          </p>
        </div>
      </div>
    </div>
  );
}