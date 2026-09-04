// Shared home page. NEXT_PUBLIC_isTwinPaper decides which site's home renders.
// Kept hook-free so the early branch is legal — each home owns its own hooks.
import BSafesHome from '../components/bsafes/bSafesHome';
import TwinPaperHome from '../components/twinPaper/twinPaperHome';

const isTwinPaper =
  !!process.env.NEXT_PUBLIC_isTwinPaper && process.env.NEXT_PUBLIC_isTwinPaper !== 'false';

export default function Home() {
  return isTwinPaper ? <TwinPaperHome /> : <BSafesHome />;
}
