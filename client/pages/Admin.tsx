import { useState } from "react";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ProjectData {
  id: string;
  projectName: string;
  customer: string;
  oem: string;
  operator: string;
  activity: string;
  noOfSites: number;
  image?: string;
}

interface EquipmentData {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export default function Admin() {
  const [projects, setProjects] = useState<ProjectData[]>([
    {
      id: "1",
      projectName: "Site Expansion Phase 1",
      customer: "Teleco Lanka",
      oem: "Ericsson",
      operator: "Dialog",
      activity: "Installation",
      noOfSites: 35,
    },
    {
      id: "2",
      projectName: "Fiber Rollout North",
      customer: "ConnectNet",
      oem: "Huawei",
      operator: "SLT",
      activity: "Maintenance",
      noOfSites: 55,
    },
  ]);

  const [equipment, setEquipment] = useState<EquipmentData[]>([
    {
      id: "1",
      title: "Fiber Optic Splicing Unit",
      description: "Precision equipment for seamless fiber connections",
    },
    {
      id: "2",
      title: "OTDR Testing Equipment",
      description: "Advanced diagnostics for network quality assurance",
    },
  ]);

  const [activeTab, setActiveTab] = useState<"projects" | "equipment">("projects");
  const [projectForm, setProjectForm] = useState({
    projectName: "",
    customer: "",
    oem: "",
    operator: "",
    activity: "",
    noOfSites: "",
  });

  const [equipmentForm, setEquipmentForm] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !projectForm.projectName ||
      !projectForm.customer ||
      !projectForm.oem ||
      !projectForm.operator ||
      !projectForm.activity ||
      !projectForm.noOfSites
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const newProject: ProjectData = {
      id: Date.now().toString(),
      projectName: projectForm.projectName,
      customer: projectForm.customer,
      oem: projectForm.oem,
      operator: projectForm.operator,
      activity: projectForm.activity,
      noOfSites: parseInt(projectForm.noOfSites),
    };

    setProjects([...projects, newProject]);
    setProjectForm({
      projectName: "",
      customer: "",
      oem: "",
      operator: "",
      activity: "",
      noOfSites: "",
    });
    toast.success("Project added successfully");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEquipment: boolean = true) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      if (isEquipment) {
        setEquipmentForm({ ...equipmentForm, image: base64String });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddEquipment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!equipmentForm.title || !equipmentForm.description) {
      toast.error("Please fill all fields");
      return;
    }

    const newEquipment: EquipmentData = {
      id: Date.now().toString(),
      title: equipmentForm.title,
      description: equipmentForm.description,
      image: equipmentForm.image,
    };

    setEquipment([...equipment, newEquipment]);
    setEquipmentForm({
      title: "",
      description: "",
      image: "",
    });
    toast.success("Equipment added successfully");
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    toast.success("Project deleted");
  };

  const handleDeleteEquipment = (id: string) => {
    setEquipment(equipment.filter((e) => e.id !== id));
    toast.success("Equipment deleted");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-card to-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage projects and equipment data</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-3 font-semibold transition border-b-2 ${
              activeTab === "projects"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab("equipment")}
            className={`px-4 py-3 font-semibold transition border-b-2 ${
              activeTab === "equipment"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Equipment
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-8 sticky top-20">
                <h2 className="text-xl font-bold mb-6">Add New Project</h2>
                <form onSubmit={handleAddProject} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Name</label>
                    <Input
                      type="text"
                      placeholder="Enter project name"
                      value={projectForm.projectName}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, projectName: e.target.value })
                      }
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Customer</label>
                    <Input
                      type="text"
                      placeholder="Customer name"
                      value={projectForm.customer}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, customer: e.target.value })
                      }
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">OEM</label>
                    <Input
                      type="text"
                      placeholder="OEM name"
                      value={projectForm.oem}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, oem: e.target.value })
                      }
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Operator</label>
                    <Input
                      type="text"
                      placeholder="Operator name"
                      value={projectForm.operator}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, operator: e.target.value })
                      }
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Activity</label>
                    <Input
                      type="text"
                      placeholder="e.g., Installation, Maintenance"
                      value={projectForm.activity}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, activity: e.target.value })
                      }
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">No. of Sites</label>
                    <Input
                      type="number"
                      placeholder="Number of sites"
                      value={projectForm.noOfSites}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, noOfSites: e.target.value })
                      }
                      className="bg-background border-border"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg"
                  >
                    <Plus size={20} className="mr-2" />
                    Add Project
                  </Button>
                </form>
              </div>
            </div>

            {/* Table */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted">
                        <th className="px-6 py-4 text-left text-sm font-semibold">Project Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">OEM</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Operator</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Activity</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Sites</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                            No projects added yet
                          </td>
                        </tr>
                      ) : (
                        projects.map((project) => (
                          <tr key={project.id} className="border-b border-border hover:bg-muted transition">
                            <td className="px-6 py-4 text-sm">{project.projectName}</td>
                            <td className="px-6 py-4 text-sm">{project.customer}</td>
                            <td className="px-6 py-4 text-sm">{project.oem}</td>
                            <td className="px-6 py-4 text-sm">{project.operator}</td>
                            <td className="px-6 py-4 text-sm">{project.activity}</td>
                            <td className="px-6 py-4 text-sm">{project.noOfSites}</td>
                            <td className="px-6 py-4 text-sm">
                              <button
                                onClick={() => handleDeleteProject(project.id)}
                                className="text-destructive hover:bg-destructive/10 p-2 rounded transition"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Equipment Tab */}
        {activeTab === "equipment" && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-8 sticky top-20">
                <h2 className="text-xl font-bold mb-6">Add Equipment</h2>
                <form onSubmit={handleAddEquipment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <Input
                      type="text"
                      placeholder="Equipment title"
                      value={equipmentForm.title}
                      onChange={(e) =>
                        setEquipmentForm({ ...equipmentForm, title: e.target.value })
                      }
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      placeholder="Equipment description"
                      value={equipmentForm.description}
                      onChange={(e) =>
                        setEquipmentForm({ ...equipmentForm, description: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, true)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                    />
                    {equipmentForm.image && (
                      <div className="mt-3 relative">
                        <img
                          src={equipmentForm.image}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg border border-border"
                        />
                        <button
                          type="button"
                          onClick={() => setEquipmentForm({ ...equipmentForm, image: "" })}
                          className="absolute top-2 right-2 bg-destructive text-white p-1 rounded hover:bg-destructive/80 transition"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg"
                  >
                    <Plus size={20} className="mr-2" />
                    Add Equipment
                  </Button>
                </form>
              </div>
            </div>

            {/* Grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {equipment.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    No equipment added yet
                  </div>
                ) : (
                  equipment.map((item) => (
                    <div
                      key={item.id}
                      className="bg-card rounded-xl border border-border p-6 hover:border-primary transition"
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                      ) : (
                        <div className="w-full h-40 bg-muted rounded-lg mb-4 flex items-center justify-center">
                          <ImageIcon size={40} className="text-muted-foreground" />
                        </div>
                      )}
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                      <button
                        onClick={() => handleDeleteEquipment(item.id)}
                        className="w-full text-destructive hover:bg-destructive/10 p-2 rounded transition flex items-center justify-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
