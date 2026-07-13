import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import AIChatbot from "@/components/shared/AIChatbot";

// Public Pages
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import CoursesPage from "./pages/CoursesPage";
import PlacementPage from "./pages/PlacementPage";
import ContactPage from "./pages/ContactPage";
import CareersPage from "./pages/CareersPage";
import ApplyPage from "./pages/ApplyPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import HRTrainingPage from "./pages/HRTrainingPage";
import InternshipPage from "./pages/InternshipPage";
import JobPage from "./pages/JobPage";
import AdminAuth from "./pages/admin/AdminAuth";
import CertificateVerifyPage from "./pages/CertificateVerifyPage";
import InternshipEnrollPage from "./pages/InternshipEnrollPage";
import CampusDrivePage from "./pages/CampusDrivePage";


// Services Pages
import ServicesPage from "./pages/ServicesPage";
import AIServicesPage from "./pages/services/AIServicesPage";
import CloudServicesPage from "./pages/services/CloudServicesPage";
import DataAnalyticsPage from "./pages/services/DataAnalyticsPage";
import CyberSecurityPage from "./pages/services/CyberSecurityPage";
import WebMobilePage from "./pages/services/WebMobilePage";
import CRMServicesPage from "./pages/services/CRMServicesPage";
import RSuitePage from "./pages/services/RSuitePage";

// Legal Pages
import TermsPage from "./pages/legal/TermsPage";
import PrivacyPage from "./pages/legal/PrivacyPage";
import RefundPage from "./pages/legal/RefundPage";
import CookiesPage from "./pages/legal/CookiesPage";
import DisclaimerPage from "./pages/legal/DisclaimerPage";

// Placement Sub-portals
import TalentConnectPage from "./pages/placement/TalentConnectPage";
import TechPartnerPage from "./pages/placement/TechPartnerPage";
import HealthConnectPage from "./pages/placement/HealthConnectPage";
import AILabPage from "./pages/placement/AILabPage";

// Dashboard Layout & Pages
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardCourses from "./pages/dashboard/DashboardCourses";
import DashboardInterview from "./pages/dashboard/DashboardInterview";
import DashboardProfile from "./pages/dashboard/DashboardProfile";
import InterviewRoundPage from "./pages/dashboard/InterviewRoundPage";
import DashboardPayments from "./pages/dashboard/DashboardPayments";
import DashboardCertificates from "./pages/dashboard/DashboardCertificates";
import DashboardInternship from "./pages/dashboard/DashboardInternship";
import DashboardResume from "./pages/dashboard/DashboardResume";
import DashboardPortfolio from "./pages/dashboard/DashboardPortfolio";
import DashboardProjects from "./pages/dashboard/DashboardProjects";
import DashboardPlacement from "./pages/dashboard/DashboardPlacement";
import CourseLearning from "./pages/dashboard/CourseLearning";
import ComingSoon from "./components/dashboard/ComingSoon";
import DashboardProgress from "./pages/dashboard/DashboardProgress";
import DashboardHRTasks from "./pages/dashboard/DashboardHRTasks";
import FreelancerDashboard from "./pages/freelancer/FreelancerDashboard";
import PatientDashboardHome from "./pages/dashboard/PatientDashboard";
import DoctorDashboardHome from "./pages/dashboard/DoctorDashboard";
import PatientAppointments from "./pages/health/PatientAppointments";
import DoctorConsultation from "./pages/health/DoctorConsultation";
import FreelancerProjects from "./pages/freelancer/FreelancerProjects";
import FreelancerBids from "./pages/freelancer/FreelancerBids";
import FreelancerEarnings from "./pages/freelancer/FreelancerEarnings";
import FreelancerContracts from "./pages/freelancer/FreelancerContracts";
import FreelancerPortfolio from "./pages/freelancer/FreelancerPortfolio";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminInterviews from "./pages/admin/AdminInterviews";
import AdminEmployers from "./pages/admin/AdminEmployers";
import AdminCertificates from "./pages/admin/AdminCertificates";
import AdminPayments from "./pages/admin/AdminPayments";
import UpdatePassword from "./pages/UpdatePassword";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminRazorpayDebug from "./pages/admin/AdminRazorpayDebug";

// Employer Pages
import EmployerLayout from "./layouts/EmployerLayout";
import EmployerAuth from "./pages/employer/EmployerAuth";
import EmployerRegister from "./pages/employer/EmployerRegister";
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import EmployerJobs from "./pages/employer/EmployerJobs";
import EmployerCandidates from "./pages/employer/EmployerCandidates";
import EmployerCompany from "./pages/employer/EmployerCompany";
import EmployerDocuments from "./pages/employer/EmployerDocuments";
import EmployerSettings from "./pages/employer/EmployerSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:category" element={<CoursesPage />} />
            <Route path="/placement" element={<PlacementPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/hr-training" element={<HRTrainingPage />} />
            <Route path="/internships" element={<InternshipPage />} />
            <Route path="/internships/enroll" element={<InternshipEnrollPage />} />
            <Route path="/career" element={<JobPage />} />
            <Route path="/campus-drive" element={<CampusDrivePage />} />
            <Route path="/placement/talent-connect" element={<TalentConnectPage />} />
            <Route path="/placement/tech-partner" element={<TechPartnerPage />} />
            <Route path="/placement/health-connect" element={<HealthConnectPage />} />
            <Route path="/placement/ai-lab" element={<AILabPage />} />
            <Route path="/apply" element={<ApplyPage />} />
            <Route path="/verify" element={<CertificateVerifyPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin/login" element={<AdminAuth />} />
            <Route path="/update-password" element={<UpdatePassword />} />

            {/* Services */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/ai" element={<AIServicesPage />} />
            <Route path="/services/cloud" element={<CloudServicesPage />} />
            <Route path="/services/data-analytics" element={<DataAnalyticsPage />} />
            <Route path="/services/cyber-security" element={<CyberSecurityPage />} />
            <Route path="/services/web-mobile" element={<WebMobilePage />} />
            <Route path="/services/crm" element={<CRMServicesPage />} />
            <Route path="/services/r-suite" element={<RSuitePage />} />

            {/* Legal */}
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/refund" element={<RefundPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />

            {/* Employer Auth Routes (outside layout) */}
            <Route path="/employer/auth" element={<EmployerAuth />} />
            <Route path="/employer/register" element={<EmployerRegister />} />

            {/* Employer Dashboard Routes */}
            <Route path="/employer/dashboard/*" element={<Navigate to="/employer" replace />} />
            <Route path="/employer" element={<EmployerLayout />}>
              <Route index element={<EmployerDashboard />} />
              <Route path="jobs" element={<EmployerJobs />} />
              <Route path="candidates" element={<EmployerCandidates />} />
              <Route path="company" element={<EmployerCompany />} />
              <Route path="documents" element={<EmployerDocuments />} />
              <Route path="settings" element={<EmployerSettings />} />
            </Route>

            {/* Student Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="courses" element={<DashboardCourses />} />
              <Route path="courses/:courseId/learn" element={<CourseLearning />} />
              <Route path="interview" element={<DashboardInterview />} />
              <Route path="interview/:categoryId/:round" element={<InterviewRoundPage />} />
              <Route path="payments" element={<DashboardPayments />} />
              <Route path="certificates" element={<DashboardCertificates />} />
              <Route path="internship" element={<DashboardInternship />} />
              <Route path="hr-tasks" element={<DashboardHRTasks />} />
              <Route path="resume" element={<DashboardResume />} />
              <Route path="portfolio" element={<DashboardPortfolio />} />
              <Route path="projects" element={<DashboardProjects />} />
              <Route path="placement" element={<DashboardPlacement />} />
              <Route path="progress" element={<DashboardProgress />} />
              <Route path="profile" element={<DashboardProfile />} />
            </Route>

            {/* Freelancer Dashboard Routes */} 
            <Route path="/freelancer-dashboard" element={<DashboardLayout role="freelancer" />}>
              <Route index element={<FreelancerDashboard />} />
              <Route path="projects" element={<FreelancerProjects />} />
              <Route path="bids" element={<FreelancerBids />} />
              <Route path="portfolio" element={<FreelancerPortfolio />} />
              <Route path="earnings" element={<FreelancerEarnings />} />
              <Route path="contracts" element={<FreelancerContracts />} />
            </Route>

            {/* Patient Dashboard Routes */}
          <Route path="/patient-dashboard" element={<DashboardLayout role="patient" />}>
            <Route index element={<PatientDashboardHome />} /> 
            <Route path="appointments" element={<PatientAppointments />} />
            <Route path="records" element={<ComingSoon />} />
            <Route path="prescriptions" element={<ComingSoon />} />
          </Route>

          {/* Doctor Dashboard Routes */}
          <Route path="/doctor-dashboard" element={<DashboardLayout role="doctor" />}>
            <Route index element={<DoctorDashboardHome />} /> 
            <Route path="consult/:id" element={<DoctorConsultation />} />
            <Route path="appointments" element={<ComingSoon />} />
          </Route>

            {/* Admin Dashboard Routes */}
            <Route path="/admin" element={<DashboardLayout isAdmin />}>
              <Route index element={<AdminDashboard />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="interviews" element={<AdminInterviews />} />
              <Route path="employers" element={<AdminEmployers />} />
              <Route path="certificates" element={<AdminCertificates />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="razorpay-debug" element={<AdminRazorpayDebug />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AIChatbot />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
