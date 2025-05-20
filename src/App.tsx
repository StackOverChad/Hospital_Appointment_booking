import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import {
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Search,
  Star,
  Building2,
  Users,
  Stethoscope,
  Activity,
  X,
} from "lucide-react";
import axios from "axios";
import emailjs from "@emailjs/browser";
type User = {
  email: string;
  password: string;
};

type Appointment = {
  _id: string; // Changed from id: number
  doctorId: number;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  reason: string;
  status: "booked" | "completed" | "cancelled";
};

type PatientRecord = {
  _id: string;
  name: string;
  age: number;
  medicalHistory: string;
  lastVisit: Date;
  prescriptions: string[];
};
emailjs.init("05nVvQc0TrOVKcPpS");
const EMAILJS_CONFIG = {
  SERVICE_ID: "service_nl22tme",
  TEMPLATES: {
    USER: "template_2jowidd",
    HOSPITAL: "template_tptx74s",
  },
};
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
    rating: 4.8,
    experience: "15+ years",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
    rating: 4.9,
    experience: "12+ years",
  },
  {
    id: 3,
    name: "Dr. Emily Williams",
    specialty: "Pediatrician",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
    rating: 4.7,
    experience: "10+ years",
  },
];

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
];

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.error || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Register
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};
interface DashboardProps {
  appointments: Appointment[];
  onCancel: (appointmentId: number) => void;
}

const Dashboard = ({ appointments, onCancel }: DashboardProps) => {
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(appointments.length === 0);
  }, [appointments]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const patientsRes = await axios.get(
          "http://localhost:5000/api/patients",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPatients(patientsRes.data);
        setLoading(false);
      } catch (err) {
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-8 max-w-7xl mx-auto py-10 pt-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Patient Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      ) : (
        <div className="grid gap-8">
          <section>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Medical Records
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {patients.map((patient) => (
                <div
                  key={patient._id}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  {/* Patient record details */}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Appointment History
            </h3>
            <div className="grid grid-cols-1 gap-6">
              {appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800">
                        {appointment.doctorName}
                      </h4>
                      <p className="text-blue-600 font-medium">
                        {appointment.doctorSpecialty}
                      </p>
                      <p className="text-gray-600 mt-2">
                        {appointment.date} at {appointment.time}
                      </p>
                      <p className="text-gray-600">
                        Patient: {appointment.patientName}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          appointment.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : appointment.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                      {appointment.status === "booked" && (
                        <button
                          onClick={() => onCancel(appointment._id)}
                          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm"
                        >
                          Cancel Appointment
                        </button>
                      )}
                    </div>
                  </div>
                  {appointment.reason && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-gray-600">
                        <span className="font-medium">Reason:</span>{" "}
                        {appointment.reason}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

const BookingModal = ({
  isOpen,
  onClose,
  selectedDoctor,
  onBook,
  hospitalEmail,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedDoctor: any;
  onBook: (data: any) => void;
  hospitalEmail: string;
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    doctor: selectedDoctor?.id || "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    reason: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const doctor = doctors.find((d) => d.id === formData.doctor);

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATES.USER,
        {
          to_email: formData.email,
          patient_name: formData.name,
          doctor_name: doctor?.name || "Our Doctor",
          appointment_date: formData.date,
          appointment_time: formData.time,
        }
      );

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATES.HOSPITAL,
        {
          to_email: hospitalEmail,
          patient_name: formData.name,
          patient_email: formData.email,
          patient_phone: formData.phone,
          doctor_name: doctor?.name || "Not Specified",
          appointment_date: formData.date,
          appointment_time: formData.time,
          reason: formData.reason,
        }
      );

      onBook({
        ...formData,
        id: Date.now().toString(),
        doctorName: doctor?.name || "",
        doctorSpecialty: doctor?.specialty || "",
        status: "booked",
      });

      onClose();
      alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Booking error:", error);
      alert("Appointment booked, but email confirmation failed.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Book an Appointment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="grid gap-4">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.doctor === doctor.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, doctor: doctor.id }));
                    setStep(2);
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{doctor.name}</h4>
                      <p className="text-blue-600">{doctor.specialty}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, date: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={`p-2 text-sm border rounded-lg ${
                        formData.time === time
                          ? "bg-blue-500 text-white border-blue-500"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, time }));
                        setStep(3);
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Reason for Visit"
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, reason: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={4}
                  required
                />
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => prev + 1)}
                className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Confirm Booking
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };
    const handleScroll = () => setScrolled(window.scrollY > 50);
    checkAuth();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_BASE}/appointments/${appointmentId}`,
        { status: "cancelled" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, status: "cancelled" } : appt
        )
      );
    } catch (error) {
      console.error("Cancel failed:", error);
    }
  };
  const handleBooking = (doctor = null) => {
    setSelectedDoctor(doctor);
    setIsBookingOpen(true);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      if (isAuthenticated) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(`${API_BASE}/appointments`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setAppointments(response.data);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      }
    };
    fetchAppointments();
  }, [isAuthenticated]);
  const handleNewAppointment = (formData: any) => {
    const selectedDoctor = doctors.find((d) => d.id === formData.doctor);
    const newAppointment: Appointment = {
      id: Date.now(),
      doctorId: formData.doctor,
      doctorName: selectedDoctor?.name || "",
      doctorSpecialty: selectedDoctor?.specialty || "",
      date: formData.date,
      time: formData.time,
      patientName: formData.name,
      patientEmail: formData.email,
      patientPhone: formData.phone,
      reason: formData.reason,
      status: "booked",
    };
    setAppointments((prev) => [...prev, newAppointment]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <nav
          className={`bg-[#A31621] text-[#FCF7F8] font-bold fixed w-full z-50 transition-all py-3 duration-300 `}
        >
          <div className=" container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="h-8 w-8 " />
                <span className="text-2xl font-bold ">HealthCare</span>
              </div>
              <div className="hidden md:flex space-x-8">
                <Link to="/" className=" hover:text-blue-600">
                  Home
                </Link>
                {/* {isAuthenticated &&  */}
                <Link to="/dashboard" className=" hover:text-blue-600">
                  Dashboard
                </Link>
                <a href="#doctors" className=" hover:text-blue-600">
                  Doctors
                </a>
                <a href="#facilities" className=" hover:text-blue-600">
                  Facilities
                </a>
                <a href="#contact" className=" hover:text-blue-600">
                  Contact
                </a>
                {!isAuthenticated ? (
                  <Link to="/login" className=" hover:text-blue-600">
                    Login
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      setIsAuthenticated(false);
                    }}
                    className=" hover:text-blue-600"
                  >
                    Logout
                  </button>
                )}
              </div>
              <button
                onClick={() => handleBooking()}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </nav>
        <div className="flex-grow">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  appointments={appointments}
                  onCancel={handleCancelAppointment}
                />
              }
            />
            <Route
              path="/"
              element={
                <>
                  <section id="home" className="pt-32 pb-20 bg-[#A31621] ">
                    <div className=" container mx-auto px-4">
                      <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                          <h1 className="text-[#FCF7F8] text-5xl font-bold mb-6">
                            Your Health Is Our Top Priority
                          </h1>
                          <p className="text-[#FCF7F8] text-lg mb-8">
                            Book appointments with the best doctors and
                            specialists in town. We provide world-class
                            healthcare services with modern facilities.
                          </p>
                          <div className="flex space-x-4">
                            <button
                              onClick={() => handleBooking()}
                              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 flex items-center"
                            >
                              Book Now <ChevronRight className="ml-2 h-5 w-5" />
                            </button>
                            <button className="text-[#FCF7F8] border-2 border-blue-600 px-8 py-3 rounded-full hover:bg-blue-500">
                              Learn More
                            </button>
                          </div>
                        </div>
                        <div className="relative">
                          <img
                            src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133"
                            alt="Hospital"
                            className="rounded-2xl shadow-2xl"
                          />
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                          <Building2 className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                          <h3 className="text-4xl font-bold text-gray-800 mb-2">
                            20+
                          </h3>
                          <p className="text-gray-600">Facilities</p>
                        </div>
                        <div className="text-center">
                          <Users className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                          <h3 className="text-4xl font-bold text-gray-800 mb-2">
                            50k+
                          </h3>
                          <p className="text-gray-600">Patients Served</p>
                        </div>
                        <div className="text-center">
                          <Stethoscope className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                          <h3 className="text-4xl font-bold text-gray-800 mb-2">
                            100+
                          </h3>
                          <p className="text-gray-600">Doctors</p>
                        </div>
                        <div className="text-center">
                          <Star className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                          <h3 className="text-4xl font-bold text-gray-800 mb-2">
                            4.8
                          </h3>
                          <p className="text-gray-600">Rating</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section id="doctors" className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
                        Our Expert Doctors
                      </h2>
                      <div className="grid md:grid-cols-3 gap-8">
                        {doctors.map((doctor) => (
                          <div
                            key={doctor.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
                          >
                            <img
                              src={doctor.image}
                              alt={doctor.name}
                              className="w-full h-64 object-cover"
                            />
                            <div className="p-6">
                              <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {doctor.name}
                              </h3>
                              <p className="text-blue-600 mb-2">
                                {doctor.specialty}
                              </p>
                              <div className="flex items-center mb-4">
                                <Star className="h-5 w-5 text-yellow-400" />
                                <span className="ml-2 text-gray-600">
                                  {doctor.rating}
                                </span>
                                <span className="ml-4 text-gray-600">
                                  {doctor.experience}
                                </span>
                              </div>
                              <button
                                onClick={() => handleBooking(doctor)}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                              >
                                Book Appointment
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section id="facilities" className="py-20">
                    <div className="container mx-auto px-4">
                      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
                        Our Facilities
                      </h2>
                      <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                          <img
                            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d"
                            alt="Emergency Care"
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Emergency Care
                          </h3>
                          <p className="text-gray-600">
                            24/7 emergency services with state-of-the-art
                            equipment and expert staff.
                          </p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6">
                          <img
                            src="https://images.unsplash.com/photo-1581595220892-b0739db3ba8c"
                            alt="Laboratory"
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Modern Laboratory
                          </h3>
                          <p className="text-gray-600">
                            Advanced diagnostic and testing facilities with
                            quick result delivery.
                          </p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6">
                          <img
                            src="https://images.unsplash.com/photo-1516549655169-df83a0774514"
                            alt="Operation Theater"
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Operation Theater
                          </h3>
                          <p className="text-gray-600">
                            Modern operation theaters equipped with the latest
                            surgical technology.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section id="contact" className="py-20 bg-blue-50">
                    <div className="container mx-auto px-4">
                      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
                        Contact Us
                      </h2>
                      <div className="grid md:grid-cols-2 gap-12">
                        <div>
                          <div className="flex items-center mb-8">
                            <MapPin className="h-6 w-6 text-blue-600 mr-4" />
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-1">
                                Location
                              </h3>
                              <p className="text-gray-600">
                                123 Healthcare Ave, Medical District
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center mb-8">
                            <Phone className="h-6 w-6 text-blue-600 mr-4" />
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-1">
                                Phone
                              </h3>
                              <p className="text-gray-600">+1 (555) 123-4567</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-6 w-6 text-blue-600 mr-4" />
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-1">
                                Email
                              </h3>
                              <p className="text-gray-600">
                                contact@healthcare.com
                              </p>
                            </div>
                          </div>
                        </div>
                        <form className="space-y-6">
                          <div>
                            <input
                              type="text"
                              placeholder="Your Name"
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600"
                            />
                          </div>
                          <div>
                            <input
                              type="email"
                              placeholder="Your Email"
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600"
                            />
                          </div>
                          <div>
                            <textarea
                              placeholder="Your Message"
                              rows={4}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600"
                            ></textarea>
                          </div>
                          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                            Send Message
                          </button>
                        </form>
                      </div>
                    </div>
                  </section>
                </>
              }
            />
          </Routes>

          <BookingModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            selectedDoctor={selectedDoctor}
            onBook={handleNewAppointment}
            hospitalEmail="hospital@healthcare.com"
          />
        </div>
        <footer className="bottom-0 w-full bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <Activity className="h-8 w-8 text-blue-400" />
                  <span className="text-2xl font-bold">HealthCare</span>
                </div>
                <p className="text-gray-400">
                  Providing world-class healthcare services with modern
                  facilities and expert doctors.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="text-gray-400 hover:text-white">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/doctors"
                      className="text-gray-400 hover:text-white"
                    >
                      Doctors
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/facilities"
                      className="text-gray-400 hover:text-white"
                    >
                      Facilities
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-gray-400 hover:text-white"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4">Services</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="#" className="text-gray-400 hover:text-white">
                      Emergency Care
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-gray-400 hover:text-white">
                      Laboratory
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-gray-400 hover:text-white">
                      Surgery
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-gray-400 hover:text-white">
                      Pharmacy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4">Working Hours</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Monday - Friday: 8:00 AM - 8:00 PM</li>
                  <li>Saturday: 9:00 AM - 6:00 PM</li>
                  <li>Sunday: 9:00 AM - 4:00 PM</li>
                  <li className="font-bold text-blue-400">Emergency: 24/7</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2025 HealthCare. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
