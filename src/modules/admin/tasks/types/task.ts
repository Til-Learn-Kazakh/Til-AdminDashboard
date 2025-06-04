export type Task = {
  id: string;
  unit_id: string;
  type: string;
  created_at: string;
  question?: Record<string, string>;
  localized_correct_answer?: Record<string, string>;
  localized_hints?: Record<string, string[]>;
  correct_answer?: string;
  hints?: string[];
  sentence?: string[];
  image_path?: string;
  audio_path?: string;
  highlighted_word?: Record<string, string>;
  description?: Record<string, string>;
  image_options?: {
    id: string;
    text: Record<string, string>;
    image: string;
  }[];
};
