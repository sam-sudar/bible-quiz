"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GroupQuizStartPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/quiz/group-quiz/start/0");
  }, [router]);

  return null;
}
