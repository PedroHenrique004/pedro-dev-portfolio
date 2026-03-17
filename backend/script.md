# Tabelas do Banco de Dados — Portfólio
 
```sql

-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.category (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL,
  description text,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT category_pkey PRIMARY KEY (id)
);

CREATE TABLE public.certificate (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL,
  description text,
  issued_by character varying NOT NULL,
  issued_at date NOT NULL,
  image_url character varying,
  display_order numeric NOT NULL DEFAULT '0'::numeric,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT certificate_pkey PRIMARY KEY (id)
);

CREATE TABLE public.experience (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  company character varying NOT NULL,
  role character varying NOT NULL,
  start_date date NOT NULL,
  end_date date,
  description text,
  display_order numeric NOT NULL DEFAULT '0'::numeric,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT experience_pkey PRIMARY KEY (id)
);

CREATE TABLE public.experience_tools (
  experience_id uuid NOT NULL,
  tool_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT experience_tools_pkey PRIMARY KEY (experience_id, tool_id),
  CONSTRAINT experience_tools_experience_id_fkey FOREIGN KEY (experience_id) REFERENCES public.experience(id),
  CONSTRAINT experience_tools_tool_id_fkey FOREIGN KEY (tool_id) REFERENCES public.tools(id)
);

CREATE TABLE public.profile (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  full_name character varying NOT NULL,
  tagline character varying,
  short_bio text,
  about text,
  email character varying NOT NULL UNIQUE,
  linkedin_url character varying,
  github_url character varying,
  updated_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT profile_pkey PRIMARY KEY (id)
);

CREATE TABLE public.profile_tools (
  profile_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  tool_id uuid NOT NULL,
  CONSTRAINT profile_tools_pkey PRIMARY KEY (profile_id, tool_id),
  CONSTRAINT profile_tools_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(id),
  CONSTRAINT profile_tools_tool_id_fkey FOREIGN KEY (tool_id) REFERENCES public.tools(id)
);

CREATE TABLE public.project (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title character varying NOT NULL,
  short_description character varying NOT NULL,
  full_description text,
  repository_url character varying,
  live_demo character varying,
  image_url character varying,
  display_order numeric NOT NULL DEFAULT '0'::numeric,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT project_pkey PRIMARY KEY (id)
);

CREATE TABLE public.project_tools (
  project_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  tool_id uuid NOT NULL,
  CONSTRAINT project_tools_pkey PRIMARY KEY (project_id, tool_id),
  CONSTRAINT project_tools_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.project(id),
  CONSTRAINT project_tools_tools_id_fkey FOREIGN KEY (tool_id) REFERENCES public.tools(id)
);

CREATE TABLE public.testimonial (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL,
  role character varying NOT NULL,
  company character varying NOT NULL,
  message text NOT NULL,
  photo_url character varying,
  display_order numeric NOT NULL DEFAULT '0'::numeric,
  linkedin_url character varying,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT testimonial_pkey PRIMARY KEY (id)

);
CREATE TABLE public.tools (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL,
  image_url character varying,
  category_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  description text,
  CONSTRAINT tools_pkey PRIMARY KEY (id),
  CONSTRAINT tools_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(id)
);
```