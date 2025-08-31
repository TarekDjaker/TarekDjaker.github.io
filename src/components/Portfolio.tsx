"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Globe, ArrowRight, Calendar, Star, Rocket } from "lucide-react";
import { motion } from "framer-motion";

// ✅ Quick edit: change these constants to personalize your portfolio in under 2 minutes
const PROFILE = {
  name: "Tarek DJAKER",
  title: "Data Scientist • ML Engineer",
  tagline:
    "Master 2 Stat & ML — optimisation, apprentissage statistique, early stopping, kernel methods. (Mise à jour : ajout d&apos;une section Défis & Interview)",
  location: "Paris, France",
  email: "djakertarek@gmail.com",
  socials: {
    github: "https://github.com/djakertarek",
    linkedin: "https://www.linkedin.com/in/",
    website: "https://",
  },
};

const SKILLS: string[] = [
  // Programming & Data
  "Python", "R", "SQL", "NumPy", "Pandas", "Polars", "scikit-learn", "PyTorch", "TensorFlow",
  // Visualization
  "Matplotlib", "Seaborn", "Plotly", "Power BI", "Tableau",
  // ML topics
  "Logistic/Linear Regression", "Random Forest", "XGBoost", "k-NN", "SVM", "Clustering", "Time Series",
  // Data eng & Big Data
  "Spark", "Hadoop", "Airflow (basics)",
  // Databases & Cloud
  "PostgreSQL", "MySQL", "MongoDB", "AWS", "GCP", "Azure",
  // MLOps & tooling
  "Git/GitHub", "Testing", "Packaging", "CI/CD",
  // Soft skills
  "Problem Solving", "Communication", "Data Ethics"
];

// Highlight 3–6 projects you're proud of
const PROJECTS = [
  {
    title: "Iris Flower Classification (UCI)",
    description:
      "Projet d&apos;introduction : classification des fleurs (Setosa/Versicolor/Virginica) à partir des tailles de sépales/pétales.",
    tags: ["scikit-learn", "EDA", "k-NN", "Logistic Regression"],
    links: { repo: "https://github.com/…", demo: "", paper: "" },
    impact: "Accuracy > 95% (validation simple) • Visualisation des frontières de décision.",
  },
  {
    title: "Titanic Survival (Kaggle)",
    description:
      "Prédire la survie des passagers en fonction de l&apos;âge, du sexe, et de la classe. Feature engineering + imputation.",
    tags: ["Classification", "Pandas", "Random Forest", "XGBoost"],
    links: { repo: "https://github.com/…" },
    impact: "Score Kaggle de base + rapport d&apos;importance des variables, SHAP en option.",
  },
  {
    title: "PIMA Diabetes", 
    description:
      "Détection du risque de diabète à partir d&apos;attributs médicaux (jeu PIMA).",
    tags: ["Logistic Regression", "Random Forest", "Model Tuning"],
    links: { repo: "https://github.com/…" },
    impact: "AUC cible ≥ 0.85, métriques sensibles au déséquilibre (ROC/PR).",
  },
  {
    title: "mysupertools",
    description:
      "Package Python : pipelines ML reproductibles (CLI + tests + packaging).",
    tags: ["Python", "Packaging", "CI"],
    links: { repo: "https://github.com/…" },
    impact: "Gain de temps sur l&apos;industrialisation des notebooks.",
  },
];

const TIMELINE = [
  { when: "2025", what: "M2 Statistiques & Machine Learning — Sorbonne Univ." },
  { when: "2024", what: "Stage LAC — Elliptic curves & crypto (info theory)" },
  { when: "2023", what: "M1 — TER sur la distribution des nombres premiers" },
];

const PUBLICATIONS: Array<{title: string; venue: string; link: string}> = [
  // { title: "Title", venue: "Arxiv 2025", link: "https://" }
];

export default function Portfolio() {
  const year = new Date().getFullYear();

  const variants = {
    fade: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
    pop: { initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 } },
  } as const;

  const skillChunks = useMemo(() => {
    const size = 12;
    const chunks: string[][] = [];
    for (let i = 0; i < SKILLS.length; i += size) chunks.push(SKILLS.slice(i, i + size));
    return chunks;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#home" className="font-semibold">{PROFILE.name}</a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#projects" className="hover:opacity-70">Projets</a>
            <a href="#skills" className="hover:opacity-70">Compétences</a>
            <a href="#timeline" className="hover:opacity-70">Parcours</a>
            <a href="#contact" className="hover:opacity-70">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <IconLink href={PROFILE.socials.github} label="GitHub"><Github size={18}/></IconLink>
            <IconLink href={PROFILE.socials.linkedin} label="LinkedIn"><Linkedin size={18}/></IconLink>
            <IconLink href={PROFILE.socials.website} label="Site"><Globe size={18}/></IconLink>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="max-w-6xl mx-auto px-4 py-16">
        <motion.div initial={variants.fade.initial} animate={variants.fade.animate} transition={{ duration: 0.5 }}>
          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                {PROFILE.title}
              </h1>
              <p className="mt-4 text-slate-600 max-w-2xl">{PROFILE.tagline}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="rounded-2xl">
                  <a href="#projects">Voir mes projets <ArrowRight className="ml-2 h-4 w-4"/></a>
                </Button>
                <Button variant="outline" asChild className="rounded-2xl">
                  <a href="#contact">Me contacter</a>
                </Button>
              </div>
            </div>
            <div className="md:col-span-5">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Rocket size={18}/> En un coup d&apos;œil</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-700 space-y-2">
                  <p>📍 {PROFILE.location}</p>
                  <p>🎯 Intérêts: théorie de l&apos;apprentissage, optimisation, énergie, crypto.</p>
                  <p>🧪 Actuel: extension de l&apos;early stopping au Boosting.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Projets sélectionnés</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.div key={i} initial={variants.pop.initial} animate={variants.pop.animate} transition={{ duration: 0.4, delay: i * 0.05 }}>
              <Card className="rounded-2xl hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{p.title}</span>
                    <span className="flex items-center text-sm text-emerald-600"><Star className="h-4 w-4 mr-1"/>Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-700">
                  <p>{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t, j) => (
                      <Badge key={j} variant="secondary" className="rounded-full">{t}</Badge>
                    ))}
                  </div>
                  {p.impact && <p className="text-slate-500 italic">{p.impact}</p>}
                  <div className="flex gap-3 pt-1">
                    {p.links?.repo && <Button asChild size="sm" variant="outline"><a href={p.links.repo}>Code</a></Button>}
                    {p.links?.demo && <Button asChild size="sm" variant="outline"><a href={p.links.demo}>Démo</a></Button>}
                    {p.links?.paper && <Button asChild size="sm" variant="outline"><a href={p.links.paper}>Article</a></Button>}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Challenges */}
      <section id="challenges" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Défis techniques (entretien & pratique)</h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-700">
          <Card className="rounded-2xl h-full"><CardHeader className="pb-2"><CardTitle className="text-base">SQL Essentials</CardTitle></CardHeader><CardContent className="pt-0"><ul className="list-disc pl-5 space-y-1"><li>JOIN multi‑tables + fenêtres (ROW_NUMBER, LAG)</li><li>Nettoyage: NULLs, outliers, types</li><li>Agrégations: cohortes, churn</li></ul></CardContent></Card>
          <Card className="rounded-2xl h-full"><CardHeader className="pb-2"><CardTitle className="text-base">A/B Testing</CardTitle></CardHeader><CardContent className="pt-0"><ul className="list-disc pl-5 space-y-1"><li>Test de proportions, IC, puissance</li><li>Design expérimental simple</li><li>Lecture d&apos;un uplift plot</li></ul></CardContent></Card>
          <Card className="rounded-2xl h-full"><CardHeader className="pb-2"><CardTitle className="text-base">Leakage & Validation</CardTitle></CardHeader><CardContent className="pt-0"><ul className="list-disc pl-5 space-y-1"><li>Split temporel vs aléatoire</li><li>Normalisation dans pipeline</li><li>Baseline & ablations</li></ul></CardContent></Card>
          <Card className="rounded-2xl h-full"><CardHeader className="pb-2"><CardTitle className="text-base">Model Metrics</CardTitle></CardHeader><CardContent className="pt-0"><ul className="list-disc pl-5 space-y-1"><li>ROC‑AUC, PR‑AUC (déséquilibre)</li><li>MAE/RMSE (régression)</li><li>WAcc/Recall@k (cas métier)</li></ul></CardContent></Card>
          <Card className="rounded-2xl h-full"><CardHeader className="pb-2"><CardTitle className="text-base">Feature Importance</CardTitle></CardHeader><CardContent className="pt-0"><ul className="list-disc pl-5 space-y-1"><li>Permutation importance</li><li>SHAP (option)</li><li>Rapport auto</li></ul></CardContent></Card>
          <Card className="rounded-2xl h-full"><CardHeader className="pb-2"><CardTitle className="text-base">Time Series</CardTitle></CardHeader><CardContent className="pt-0"><ul className="list-disc pl-5 space-y-1"><li>Stationnarité, lags</li><li>Validation glissante</li><li>Features calendaires/énergie</li></ul></CardContent></Card>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Compétences</h2>
        <div className="grid gap-4">
          {skillChunks.map((chunk, i) => (
            <div key={i} className="flex flex-wrap gap-2">
              {chunk.map((s) => (
                <Badge key={s} variant="secondary" className="rounded-full">{s}</Badge>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Parcours</h2>
        <div className="grid gap-4">
          {TIMELINE.map((t, i) => (
            <Card key={i} className="rounded-2xl">
              <CardContent className="py-4 px-6 flex items-center gap-4 text-sm text-slate-700">
                <Badge className="rounded-full"><Calendar className="h-3.5 w-3.5 mr-1"/> {t.when}</Badge>
                <span>{t.what}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Publications (optional) */}
      {PUBLICATIONS.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Publications</h2>
          <div className="grid gap-4">
            {PUBLICATIONS.map((p, i) => (
              <Card key={i} className="rounded-2xl">
                <CardContent className="py-4 px-6 text-sm text-slate-700">
                  <a className="font-medium underline" href={p.link}>{p.title}</a> — <span className="text-slate-500">{p.venue}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Contact</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Discutons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              <p>Disponible pour stage/alternance/mission freelance. Écrivez-moi :</p>
              <p className="flex items-center gap-2"><Mail size={16}/> <a href={`mailto:${PROFILE.email}`} className="underline">{PROFILE.email}</a></p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Message rapide</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-3" onSubmit={(e) => { e.preventDefault(); alert("Merci ! Je vous réponds vite."); }}>
                <Input placeholder="Votre email" type="email" required />
                <Textarea placeholder="Votre message" rows={5} required />
                <Button type="submit" className="rounded-2xl">Envoyer</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t py-10 text-center text-sm text-slate-500">© {year} {PROFILE.name}. Propulsé par React + Tailwind. (Pense à déployer sur GitHub Pages : Settings → Pages → deploy from branch)</footer>
    </div>
  );
}

function IconLink({ href, label, children }: { href?: string; label: string; children: React.ReactNode }) {
  if (!href) return null;
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex items-center justify-center h-9 w-9 rounded-full border hover:bg-slate-50"
    >
      {children}
    </a>
  );
}