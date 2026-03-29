"use client";
import { useState } from 'react';
import { Users, Plus, Pencil, Trash2, X } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  memberCount: number;
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [teamName, setTeamName] = useState("");

  const handleOpenModal = (team?: Team) => {
    if (team) {
      setEditingTeam(team);
      setTeamName(team.name);
    } else {
      setEditingTeam(null);
      setTeamName("");
    }
    setIsModalOpen(true);
  };

  const handleSaveTeam = () => {
    if (!teamName.trim()) return;

    if (editingTeam) {
      setTeams(teams.map(t => t.id === editingTeam.id ? { ...t, name: teamName } : t));
    } else {
      const newTeam: Team = {
        id: Math.random().toString(36).substr(2, 9),
        name: teamName,
        memberCount: 1, // Default to creator
      };
      setTeams([...teams, newTeam]);
    }
    setIsModalOpen(false);
    setTeamName("");
  };

  const deleteTeam = (id: string) => {
    setTeams(teams.filter(t => t.id !== id));
  };

  return (
    <div className=" mx-auto ">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Teams</h1>
          <p className="text-slate-400 font-medium">Collaborate with others on shared projects</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold shadow-lg shadow-blue-100 transition-all active:scale-95"
        >
          <Plus size={20} /> Create Team
        </button>
      </div>

      {/* Conditional Rendering: Empty State vs Team List */}
      {teams.length === 0 ? (
        <div className="h-[50vh] flex flex-col items-center justify-center text-center bg-white rounded-[32px] border border-slate-100 shadow-sm">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-300">
            <Users size={40} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">No teams yet</h2>
          <p className="text-slate-400 mb-8 max-w-xs">Create your first team to start collaborating with your peers.</p>
          <button 
            onClick={() => handleOpenModal()}
            className="text-blue-500 font-bold hover:underline"
          >
            Create your first team now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div key={team.id} className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-500">
                  <Users size={24} />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleOpenModal(team)}
                    className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-blue-500 transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                  <button 
                    onClick={() => deleteTeam(team.id)}
                    className="p-2 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">{team.name}</h3>
              <p className="text-sm text-slate-400 font-medium">{team.memberCount} members</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingTeam ? "Edit Team" : "Create New Team"}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 ml-1">
                    Team Name <span className="text-rose-500">*</span>
                  </label>
                  <input 
                    autoFocus
                    type="text" 
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter team name" 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all" 
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-3.5 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveTeam}
                    disabled={!teamName.trim()}
                    className="flex-1 px-6 py-3.5 bg-blue-500 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-100 disabled:opacity-50 disabled:shadow-none"
                  >
                    {editingTeam ? "Save Changes" : "Create Team"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}