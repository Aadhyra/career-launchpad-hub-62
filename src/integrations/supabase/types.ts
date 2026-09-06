export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      applicant_details: {
        Row: {
          application_type: string
          created_at: string
          date_of_joining: string | null
          domain: string | null
          email: string
          father_mobile: string | null
          father_name: string | null
          full_name: string
          guardian_mobile: string | null
          guardian_name: string | null
          hr_name: string | null
          id: string
          mother_mobile: string | null
          mother_name: string | null
          perm_area: string | null
          perm_city: string | null
          perm_country: string | null
          perm_district: string | null
          perm_door_no: string | null
          perm_landmark: string | null
          perm_pincode: string | null
          perm_state: string | null
          perm_street: string | null
          phone: string
          pres_area: string | null
          pres_city: string | null
          pres_country: string | null
          pres_district: string | null
          pres_door_no: string | null
          pres_landmark: string | null
          pres_pincode: string | null
          pres_state: string | null
          pres_street: string | null
          reference_id: string | null
          salary_package: string | null
          same_as_permanent: boolean
          team_leader_name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          application_type: string
          created_at?: string
          date_of_joining?: string | null
          domain?: string | null
          email: string
          father_mobile?: string | null
          father_name?: string | null
          full_name: string
          guardian_mobile?: string | null
          guardian_name?: string | null
          hr_name?: string | null
          id?: string
          mother_mobile?: string | null
          mother_name?: string | null
          perm_area?: string | null
          perm_city?: string | null
          perm_country?: string | null
          perm_district?: string | null
          perm_door_no?: string | null
          perm_landmark?: string | null
          perm_pincode?: string | null
          perm_state?: string | null
          perm_street?: string | null
          phone: string
          pres_area?: string | null
          pres_city?: string | null
          pres_country?: string | null
          pres_district?: string | null
          pres_door_no?: string | null
          pres_landmark?: string | null
          pres_pincode?: string | null
          pres_state?: string | null
          pres_street?: string | null
          reference_id?: string | null
          salary_package?: string | null
          same_as_permanent?: boolean
          team_leader_name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          application_type?: string
          created_at?: string
          date_of_joining?: string | null
          domain?: string | null
          email?: string
          father_mobile?: string | null
          father_name?: string | null
          full_name?: string
          guardian_mobile?: string | null
          guardian_name?: string | null
          hr_name?: string | null
          id?: string
          mother_mobile?: string | null
          mother_name?: string | null
          perm_area?: string | null
          perm_city?: string | null
          perm_country?: string | null
          perm_district?: string | null
          perm_door_no?: string | null
          perm_landmark?: string | null
          perm_pincode?: string | null
          perm_state?: string | null
          perm_street?: string | null
          phone?: string
          pres_area?: string | null
          pres_city?: string | null
          pres_country?: string | null
          pres_district?: string | null
          pres_door_no?: string | null
          pres_landmark?: string | null
          pres_pincode?: string | null
          pres_state?: string | null
          pres_street?: string | null
          reference_id?: string | null
          salary_package?: string | null
          same_as_permanent?: boolean
          team_leader_name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      applicant_documents: {
        Row: {
          applicant_detail_id: string | null
          created_at: string
          document_type: string
          file_name: string
          id: string
          mime_type: string | null
          size_bytes: number | null
          storage_path: string
          user_id: string
        }
        Insert: {
          applicant_detail_id?: string | null
          created_at?: string
          document_type: string
          file_name: string
          id?: string
          mime_type?: string | null
          size_bytes?: number | null
          storage_path: string
          user_id: string
        }
        Update: {
          applicant_detail_id?: string | null
          created_at?: string
          document_type?: string
          file_name?: string
          id?: string
          mime_type?: string | null
          size_bytes?: number | null
          storage_path?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applicant_documents_applicant_detail_id_fkey"
            columns: ["applicant_detail_id"]
            isOneToOne: false
            referencedRelation: "applicant_details"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          course: string
          created_at: string
          email: string
          full_name: string
          id: string
          notes: string | null
          phone: string
          status: string
          updated_at: string
          user_id: string | null
          vertical: string
        }
        Insert: {
          course: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          notes?: string | null
          phone: string
          status?: string
          updated_at?: string
          user_id?: string | null
          vertical: string
        }
        Update: {
          course?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string
          status?: string
          updated_at?: string
          user_id?: string | null
          vertical?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          appointment_date: string
          appointment_time: string
          created_at: string | null
          doctor_id: string
          id: string
          notes: string | null
          patient_id: string
          status: string | null
          symptoms: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          created_at?: string | null
          doctor_id: string
          id?: string
          notes?: string | null
          patient_id: string
          status?: string | null
          symptoms?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          created_at?: string | null
          doctor_id?: string
          id?: string
          notes?: string | null
          patient_id?: string
          status?: string | null
          symptoms?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      bank_accounts: {
        Row: {
          account_holder_name: string
          account_number: string | null
          account_type: string
          bank_name: string | null
          created_at: string
          id: string
          ifsc_code: string | null
          is_primary: boolean | null
          is_verified: boolean | null
          updated_at: string
          upi_id: string | null
          user_id: string
        }
        Insert: {
          account_holder_name: string
          account_number?: string | null
          account_type: string
          bank_name?: string | null
          created_at?: string
          id?: string
          ifsc_code?: string | null
          is_primary?: boolean | null
          is_verified?: boolean | null
          updated_at?: string
          upi_id?: string | null
          user_id: string
        }
        Update: {
          account_holder_name?: string
          account_number?: string | null
          account_type?: string
          bank_name?: string | null
          created_at?: string
          id?: string
          ifsc_code?: string | null
          is_primary?: boolean | null
          is_verified?: boolean | null
          updated_at?: string
          upi_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      campus_drive_requests: {
        Row: {
          address: string | null
          admin_notes: string | null
          city: string
          college_name: string
          contact_person: string
          created_at: string
          departments: string[] | null
          designation: string | null
          drive_mode: string
          email: string
          expected_students: number | null
          id: string
          notes: string | null
          phone: string
          preferred_date: string | null
          state: string
          status: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          admin_notes?: string | null
          city: string
          college_name: string
          contact_person: string
          created_at?: string
          departments?: string[] | null
          designation?: string | null
          drive_mode?: string
          email: string
          expected_students?: number | null
          id?: string
          notes?: string | null
          phone: string
          preferred_date?: string | null
          state: string
          status?: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          admin_notes?: string | null
          city?: string
          college_name?: string
          contact_person?: string
          created_at?: string
          departments?: string[] | null
          designation?: string | null
          drive_mode?: string
          email?: string
          expected_students?: number | null
          id?: string
          notes?: string | null
          phone?: string
          preferred_date?: string | null
          state?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      certificates: {
        Row: {
          certificate_id: string
          certificate_type: string
          certificate_url: string | null
          course_id: string
          created_at: string
          id: string
          issue_date: string
          qr_code_url: string | null
          user_id: string
          verified: boolean | null
        }
        Insert: {
          certificate_id: string
          certificate_type: string
          certificate_url?: string | null
          course_id: string
          created_at?: string
          id?: string
          issue_date?: string
          qr_code_url?: string | null
          user_id: string
          verified?: boolean | null
        }
        Update: {
          certificate_id?: string
          certificate_type?: string
          certificate_url?: string | null
          course_id?: string
          created_at?: string
          id?: string
          issue_date?: string
          qr_code_url?: string | null
          user_id?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "certificates_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      college_registrations: {
        Row: {
          city: string
          college_name: string
          created_at: string
          department: string
          designation: string
          first_name: string
          id: string
          last_name: string
          mobile: string
          notes: string | null
          official_email: string
          status: string
          updated_at: string
        }
        Insert: {
          city: string
          college_name: string
          created_at?: string
          department: string
          designation: string
          first_name: string
          id?: string
          last_name: string
          mobile: string
          notes?: string | null
          official_email: string
          status?: string
          updated_at?: string
        }
        Update: {
          city?: string
          college_name?: string
          created_at?: string
          department?: string
          designation?: string
          first_name?: string
          id?: string
          last_name?: string
          mobile?: string
          notes?: string | null
          official_email?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string | null
          status: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          status?: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          status?: string
          subject?: string | null
        }
        Relationships: []
      }
      course_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      course_modules: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          duration_minutes: number | null
          id: string
          notes_url: string | null
          order_index: number
          title: string
          video_url: string | null
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          notes_url?: string | null
          order_index: number
          title: string
          video_url?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          notes_url?: string | null
          order_index?: number
          title?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_payments: {
        Row: {
          amount: number
          created_at: string
          enrollment_id: string
          id: string
          invoice_url: string | null
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          status: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          enrollment_id: string
          id?: string
          invoice_url?: string | null
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          status?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          enrollment_id?: string
          id?: string
          invoice_url?: string | null
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_payments_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          category_id: string
          created_at: string
          description: string | null
          duration: string | null
          eligibility: string | null
          has_internship: boolean | null
          has_placement: boolean | null
          id: string
          is_active: boolean | null
          price: number
          slug: string
          title: string
          tools_covered: string[] | null
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          description?: string | null
          duration?: string | null
          eligibility?: string | null
          has_internship?: boolean | null
          has_placement?: boolean | null
          id?: string
          is_active?: boolean | null
          price?: number
          slug: string
          title: string
          tools_covered?: string[] | null
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          description?: string | null
          duration?: string | null
          eligibility?: string | null
          has_internship?: boolean | null
          has_placement?: boolean | null
          id?: string
          is_active?: boolean | null
          price?: number
          slug?: string
          title?: string
          tools_covered?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "course_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      doctor_availability: {
        Row: {
          created_at: string | null
          day_of_week: number
          doctor_id: string
          end_time: string
          id: string
          is_available: boolean | null
          start_time: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          day_of_week: number
          doctor_id: string
          end_time: string
          id?: string
          is_available?: boolean | null
          start_time: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          day_of_week?: number
          doctor_id?: string
          end_time?: string
          id?: string
          is_available?: boolean | null
          start_time?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      employers: {
        Row: {
          address: string | null
          city: string | null
          company_email: string
          company_logo: string | null
          company_name: string
          company_phone: string | null
          company_size: string | null
          company_website: string | null
          created_at: string
          description: string | null
          documents_url: string | null
          id: string
          industry: string | null
          is_verified: boolean | null
          state: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          company_email: string
          company_logo?: string | null
          company_name: string
          company_phone?: string | null
          company_size?: string | null
          company_website?: string | null
          created_at?: string
          description?: string | null
          documents_url?: string | null
          id?: string
          industry?: string | null
          is_verified?: boolean | null
          state?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          city?: string | null
          company_email?: string
          company_logo?: string | null
          company_name?: string
          company_phone?: string | null
          company_size?: string | null
          company_website?: string | null
          created_at?: string
          description?: string | null
          documents_url?: string | null
          id?: string
          industry?: string | null
          is_verified?: boolean | null
          state?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          completed_at: string | null
          course_id: string
          current_module: number | null
          enrolled_at: string
          id: string
          progress: number | null
          status: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          course_id: string
          current_module?: number | null
          enrolled_at?: string
          id?: string
          progress?: number | null
          status?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          course_id?: string
          current_module?: number | null
          enrolled_at?: string
          id?: string
          progress?: number | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_attempts: {
        Row: {
          answers: Json | null
          completed_at: string | null
          created_at: string
          exam_id: string
          id: string
          max_score: number | null
          passed: boolean | null
          score: number | null
          started_at: string | null
          user_id: string
        }
        Insert: {
          answers?: Json | null
          completed_at?: string | null
          created_at?: string
          exam_id: string
          id?: string
          max_score?: number | null
          passed?: boolean | null
          score?: number | null
          started_at?: string | null
          user_id: string
        }
        Update: {
          answers?: Json | null
          completed_at?: string | null
          created_at?: string
          exam_id?: string
          id?: string
          max_score?: number | null
          passed?: boolean | null
          score?: number | null
          started_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_attempts_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "module_exams"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_questions: {
        Row: {
          correct_answer: string
          created_at: string
          exam_id: string
          id: string
          options: Json
          order_index: number | null
          points: number | null
          question_text: string
        }
        Insert: {
          correct_answer: string
          created_at?: string
          exam_id: string
          id?: string
          options: Json
          order_index?: number | null
          points?: number | null
          question_text: string
        }
        Update: {
          correct_answer?: string
          created_at?: string
          exam_id?: string
          id?: string
          options?: Json
          order_index?: number | null
          points?: number | null
          question_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_questions_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "module_exams"
            referencedColumns: ["id"]
          },
        ]
      }
      freelancer_earnings: {
        Row: {
          amount: number
          cleared_at: string | null
          created_at: string | null
          freelancer_id: string
          id: string
          project_id: string | null
          status: string | null
        }
        Insert: {
          amount: number
          cleared_at?: string | null
          created_at?: string | null
          freelancer_id: string
          id?: string
          project_id?: string | null
          status?: string | null
        }
        Update: {
          amount?: number
          cleared_at?: string | null
          created_at?: string | null
          freelancer_id?: string
          id?: string
          project_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "freelancer_earnings_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "live_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      freelancer_portfolio_projects: {
        Row: {
          category: string
          created_at: string | null
          freelancer_id: string
          id: string
          image_url: string | null
          live_url: string | null
          tech_stack: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          freelancer_id: string
          id?: string
          image_url?: string | null
          live_url?: string | null
          tech_stack?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          freelancer_id?: string
          id?: string
          image_url?: string | null
          live_url?: string | null
          tech_stack?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      hr_internship_tasks: {
        Row: {
          created_at: string
          description: string | null
          duration_days: number | null
          id: string
          is_active: boolean | null
          max_payout: number | null
          payout_per_unit: number
          target_count: number
          task_type: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_days?: number | null
          id?: string
          is_active?: boolean | null
          max_payout?: number | null
          payout_per_unit?: number
          target_count?: number
          task_type: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_days?: number | null
          id?: string
          is_active?: boolean | null
          max_payout?: number | null
          payout_per_unit?: number
          target_count?: number
          task_type?: string
          title?: string
        }
        Relationships: []
      }
      hr_task_progress: {
        Row: {
          completed_at: string | null
          completed_count: number
          earnings: number
          id: string
          started_at: string
          status: string
          task_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          completed_count?: number
          earnings?: number
          id?: string
          started_at?: string
          status?: string
          task_id: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          completed_count?: number
          earnings?: number
          id?: string
          started_at?: string
          status?: string
          task_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hr_task_progress_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "hr_internship_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      internship_submissions: {
        Row: {
          grade: string | null
          id: string
          mentor_feedback: string | null
          notes: string | null
          reviewed_at: string | null
          submission_url: string | null
          submitted_at: string
          task_id: string
          user_id: string
        }
        Insert: {
          grade?: string | null
          id?: string
          mentor_feedback?: string | null
          notes?: string | null
          reviewed_at?: string | null
          submission_url?: string | null
          submitted_at?: string
          task_id: string
          user_id: string
        }
        Update: {
          grade?: string | null
          id?: string
          mentor_feedback?: string | null
          notes?: string | null
          reviewed_at?: string | null
          submission_url?: string | null
          submitted_at?: string
          task_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "internship_submissions_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "internship_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      internship_tasks: {
        Row: {
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          internship_id: string
          status: string | null
          title: string
          week_number: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          internship_id: string
          status?: string | null
          title: string
          week_number: number
        }
        Update: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          internship_id?: string
          status?: string | null
          title?: string
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "internship_tasks_internship_id_fkey"
            columns: ["internship_id"]
            isOneToOne: false
            referencedRelation: "internships"
            referencedColumns: ["id"]
          },
        ]
      }
      internships: {
        Row: {
          course_id: string
          created_at: string
          end_date: string | null
          id: string
          mentor_name: string | null
          start_date: string | null
          status: string
          submissions: Json | null
          tasks: Json | null
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string
          end_date?: string | null
          id?: string
          mentor_name?: string | null
          start_date?: string | null
          status?: string
          submissions?: Json | null
          tasks?: Json | null
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string
          end_date?: string | null
          id?: string
          mentor_name?: string | null
          start_date?: string | null
          status?: string
          submissions?: Json | null
          tasks?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "internships_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_answers: {
        Row: {
          attempt_id: string
          created_at: string
          id: string
          is_correct: boolean | null
          question_id: string
          time_taken: number | null
          user_answer: string | null
        }
        Insert: {
          attempt_id: string
          created_at?: string
          id?: string
          is_correct?: boolean | null
          question_id: string
          time_taken?: number | null
          user_answer?: string | null
        }
        Update: {
          attempt_id?: string
          created_at?: string
          id?: string
          is_correct?: boolean | null
          question_id?: string
          time_taken?: number | null
          user_answer?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_answers_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "interview_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "interview_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_attempts: {
        Row: {
          ai_evaluation: Json | null
          completed_at: string | null
          course_id: string
          created_at: string
          id: string
          max_score: number | null
          passed: boolean | null
          proctoring_violations: number | null
          round: string
          score: number | null
          started_at: string | null
          status: string
          user_id: string
          video_url: string | null
        }
        Insert: {
          ai_evaluation?: Json | null
          completed_at?: string | null
          course_id: string
          created_at?: string
          id?: string
          max_score?: number | null
          passed?: boolean | null
          proctoring_violations?: number | null
          round: string
          score?: number | null
          started_at?: string | null
          status?: string
          user_id: string
          video_url?: string | null
        }
        Update: {
          ai_evaluation?: Json | null
          completed_at?: string | null
          course_id?: string
          created_at?: string
          id?: string
          max_score?: number | null
          passed?: boolean | null
          proctoring_violations?: number | null
          round?: string
          score?: number | null
          started_at?: string | null
          status?: string
          user_id?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_attempts_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_fee_payments: {
        Row: {
          amount: number
          course_id: string
          created_at: string
          id: string
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          status: string
          user_id: string
        }
        Insert: {
          amount?: number
          course_id: string
          created_at?: string
          id?: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          status?: string
          user_id: string
        }
        Update: {
          amount?: number
          course_id?: string
          created_at?: string
          id?: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_fee_payments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_questions: {
        Row: {
          category_id: string | null
          correct_answer: string | null
          course_id: string | null
          created_at: string
          difficulty: string | null
          id: string
          options: Json | null
          points: number | null
          question_text: string
          round: string
          time_limit: number | null
        }
        Insert: {
          category_id?: string | null
          correct_answer?: string | null
          course_id?: string | null
          created_at?: string
          difficulty?: string | null
          id?: string
          options?: Json | null
          points?: number | null
          question_text: string
          round: string
          time_limit?: number | null
        }
        Update: {
          category_id?: string | null
          correct_answer?: string | null
          course_id?: string | null
          created_at?: string
          difficulty?: string | null
          id?: string
          options?: Json | null
          points?: number | null
          question_text?: string
          round?: string
          time_limit?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_questions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "course_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_questions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          applied_at: string
          cover_letter: string | null
          employer_notes: string | null
          id: string
          interview_date: string | null
          interview_notes: string | null
          job_id: string
          resume_url: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          applied_at?: string
          cover_letter?: string | null
          employer_notes?: string | null
          id?: string
          interview_date?: string | null
          interview_notes?: string | null
          job_id: string
          resume_url?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          applied_at?: string
          cover_letter?: string | null
          employer_notes?: string | null
          id?: string
          interview_date?: string | null
          interview_notes?: string | null
          job_id?: string
          resume_url?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_postings: {
        Row: {
          company_name: string | null
          created_at: string
          department: string
          description: string | null
          experience_max: number | null
          experience_min: number | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          job_type: string
          location: string | null
          posted_by: string | null
          requirements: string | null
          salary_max: number | null
          salary_min: number | null
          skills: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          department: string
          description?: string | null
          experience_max?: number | null
          experience_min?: number | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          job_type?: string
          location?: string | null
          posted_by?: string | null
          requirements?: string | null
          salary_max?: number | null
          salary_min?: number | null
          skills?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          department?: string
          description?: string | null
          experience_max?: number | null
          experience_min?: number | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          job_type?: string
          location?: string | null
          posted_by?: string | null
          requirements?: string | null
          salary_max?: number | null
          salary_min?: number | null
          skills?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          created_at: string
          description: string | null
          employer_id: string
          experience_max: number | null
          experience_min: number | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          is_approved: boolean | null
          job_type: string | null
          location: string | null
          posted_at: string
          requirements: string | null
          salary_max: number | null
          salary_min: number | null
          skills: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          employer_id: string
          experience_max?: number | null
          experience_min?: number | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          is_approved?: boolean | null
          job_type?: string | null
          location?: string | null
          posted_at?: string
          requirements?: string | null
          salary_max?: number | null
          salary_min?: number | null
          skills?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          employer_id?: string
          experience_max?: number | null
          experience_min?: number | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          is_approved?: boolean | null
          job_type?: string | null
          location?: string | null
          posted_at?: string
          requirements?: string | null
          salary_max?: number | null
          salary_min?: number | null
          skills?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
        ]
      }
      live_projects: {
        Row: {
          category_id: string | null
          created_at: string
          demo_video_url: string | null
          description: string | null
          documentation_url: string | null
          id: string
          includes: Json | null
          is_active: boolean | null
          preview_url: string | null
          price: number
          project_type: string | null
          source_code_url: string | null
          tech_stack: string[] | null
          thumbnail_url: string | null
          title: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          demo_video_url?: string | null
          description?: string | null
          documentation_url?: string | null
          id?: string
          includes?: Json | null
          is_active?: boolean | null
          preview_url?: string | null
          price?: number
          project_type?: string | null
          source_code_url?: string | null
          tech_stack?: string[] | null
          thumbnail_url?: string | null
          title: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          demo_video_url?: string | null
          description?: string | null
          documentation_url?: string | null
          id?: string
          includes?: Json | null
          is_active?: boolean | null
          preview_url?: string | null
          price?: number
          project_type?: string | null
          source_code_url?: string | null
          tech_stack?: string[] | null
          thumbnail_url?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_projects_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "course_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_records: {
        Row: {
          created_at: string | null
          description: string | null
          doctor_id: string | null
          file_url: string | null
          id: string
          patient_id: string
          record_type: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          doctor_id?: string | null
          file_url?: string | null
          id?: string
          patient_id: string
          record_type: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          doctor_id?: string | null
          file_url?: string | null
          id?: string
          patient_id?: string
          record_type?: string
        }
        Relationships: []
      }
      module_exams: {
        Row: {
          created_at: string
          id: string
          module_id: string
          pass_percentage: number | null
          time_limit_minutes: number | null
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          module_id: string
          pass_percentage?: number | null
          time_limit_minutes?: number | null
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          module_id?: string
          pass_percentage?: number | null
          time_limit_minutes?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "module_exams_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolios: {
        Row: {
          bio: string | null
          created_at: string
          id: string
          is_public: boolean | null
          projects: Json | null
          skills: Json | null
          slug: string
          social_links: Json | null
          theme: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          id?: string
          is_public?: boolean | null
          projects?: Json | null
          skills?: Json | null
          slug: string
          social_links?: Json | null
          theme?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          id?: string
          is_public?: boolean | null
          projects?: Json | null
          skills?: Json | null
          slug?: string
          social_links?: Json | null
          theme?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      prescriptions: {
        Row: {
          appointment_id: string
          doctor_id: string
          id: string
          instructions: string | null
          issued_at: string | null
          medications: Json
          patient_id: string
        }
        Insert: {
          appointment_id: string
          doctor_id: string
          id?: string
          instructions?: string | null
          issued_at?: string | null
          medications?: Json
          patient_id: string
        }
        Update: {
          appointment_id?: string
          doctor_id?: string
          id?: string
          instructions?: string | null
          issued_at?: string | null
          medications?: Json
          patient_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string
          id: string
          mobile: string | null
          qualification: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name: string
          id?: string
          mobile?: string | null
          qualification?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          mobile?: string | null
          qualification?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      project_bids: {
        Row: {
          bid_amount: number
          cover_letter: string | null
          created_at: string | null
          estimated_days: number | null
          freelancer_id: string
          id: string
          project_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          bid_amount: number
          cover_letter?: string | null
          created_at?: string | null
          estimated_days?: number | null
          freelancer_id: string
          id?: string
          project_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          bid_amount?: number
          cover_letter?: string | null
          created_at?: string | null
          estimated_days?: number | null
          freelancer_id?: string
          id?: string
          project_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_bids_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "live_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_milestones: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          freelancer_id: string
          id: string
          project_id: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          freelancer_id: string
          id?: string
          project_id: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          freelancer_id?: string
          id?: string
          project_id?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_milestones_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "live_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_purchases: {
        Row: {
          amount: number
          created_at: string
          download_url: string | null
          id: string
          project_id: string
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          status: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          download_url?: string | null
          id?: string
          project_id: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          status?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          download_url?: string | null
          id?: string
          project_id?: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_purchases_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "live_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      razorpay_debug_logs: {
        Row: {
          amount: number | null
          created_at: string
          currency: string | null
          error_message: string | null
          event_type: string
          id: string
          order_id: string | null
          payment_id: string | null
          raw_response: Json | null
          receipt: string | null
          signature_expected: string | null
          signature_provided: string | null
          status: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          currency?: string | null
          error_message?: string | null
          event_type: string
          id?: string
          order_id?: string | null
          payment_id?: string | null
          raw_response?: Json | null
          receipt?: string | null
          signature_expected?: string | null
          signature_provided?: string | null
          status?: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          currency?: string | null
          error_message?: string | null
          event_type?: string
          id?: string
          order_id?: string | null
          payment_id?: string | null
          raw_response?: Json | null
          receipt?: string | null
          signature_expected?: string | null
          signature_provided?: string | null
          status?: string
        }
        Relationships: []
      }
      resume_data: {
        Row: {
          certifications: Json | null
          created_at: string
          education: Json | null
          experience: Json | null
          id: string
          personal_info: Json | null
          projects: Json | null
          skills: Json | null
          template: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          certifications?: Json | null
          created_at?: string
          education?: Json | null
          experience?: Json | null
          id?: string
          personal_info?: Json | null
          projects?: Json | null
          skills?: Json | null
          template?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          certifications?: Json | null
          created_at?: string
          education?: Json | null
          experience?: Json | null
          id?: string
          personal_info?: Json | null
          projects?: Json | null
          skills?: Json | null
          template?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      skill_matches: {
        Row: {
          created_at: string
          id: string
          is_notified: boolean | null
          job_id: string
          match_score: number | null
          matched_skills: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_notified?: boolean | null
          job_id: string
          match_score?: number | null
          matched_skills?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_notified?: boolean | null
          job_id?: string
          match_score?: number | null
          matched_skills?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_matches_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wallet_transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          reference_id: string | null
          reference_type: string | null
          status: string
          type: string
          user_id: string
          wallet_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          status?: string
          type: string
          user_id: string
          wallet_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          status?: string
          type?: string
          user_id?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          balance: number
          created_at: string
          id: string
          total_earned: number
          total_withdrawn: number
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          id?: string
          total_earned?: number
          total_withdrawn?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          id?: string
          total_earned?: number
          total_withdrawn?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      withdrawal_requests: {
        Row: {
          amount: number
          bank_account_id: string
          created_at: string
          id: string
          processed_at: string | null
          rejection_reason: string | null
          status: string
          transaction_reference: string | null
          user_id: string
          wallet_id: string
        }
        Insert: {
          amount: number
          bank_account_id: string
          created_at?: string
          id?: string
          processed_at?: string | null
          rejection_reason?: string | null
          status?: string
          transaction_reference?: string | null
          user_id: string
          wallet_id: string
        }
        Update: {
          amount?: number
          bank_account_id?: string
          created_at?: string
          id?: string
          processed_at?: string | null
          rejection_reason?: string | null
          status?: string
          transaction_reference?: string | null
          user_id?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "withdrawal_requests_bank_account_id_fkey"
            columns: ["bank_account_id"]
            isOneToOne: false
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "withdrawal_requests_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_employer_id: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      is_employer: { Args: never; Returns: boolean }
      is_enrolled_in_course: { Args: { _course_id: string }; Returns: boolean }
      request_withdrawal: {
        Args: {
          p_amount: number
          p_bank_account_id: string
          p_wallet_id: string
        }
        Returns: string
      }
    }
    Enums: {
      app_role: "admin" | "student" | "employer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "student", "employer"],
    },
  },
} as const
