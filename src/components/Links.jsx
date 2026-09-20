import {
	FaGithub,
	FaInstagram,
	FaLinkedinIn,
	FaXTwitter,
} from 'react-icons/fa6'
import { SiBuymeacoffee, SiSubstack } from 'react-icons/si'
import { FiGlobe, FiArrowUpRight } from 'react-icons/fi'

const links = [
	{ label: 'Portfolio', href: '/', icon: FiGlobe },
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/samirrhashimov/', icon: FaLinkedinIn },
	{ label: 'GitHub', href: 'https://github.com/samirrhashimov', icon: FaGithub },
	{ label: 'Instagram', href: 'https://www.instagram.com/samirrhashimov/', icon: FaInstagram },
	{ label: 'X', href: 'https://x.com/samirrhashimov', icon: FaXTwitter },
	{ label: 'Substack', href: 'https://samirrhashimov.substack.com/', icon: SiSubstack },
	{ label: 'Buy Me a Coffee', href: 'https://buymeacoffee.com/samirrhashimov', icon: SiBuymeacoffee },
]

const Links = () => (
	<main className='mx-auto min-h-[calc(100vh-65px)] max-w-[1200px] px-12 py-10 font-[Inter]'>
		<div className='mx-auto w-full max-w-[680px]'>
			<div className='mb-7 border-b border-border pb-5 text-center'>
				<h1 className='text-[1.8rem] font-bold text-text'>Samir Hashimov</h1>
				<p className='mt-1 text-sm text-secondary'>Junior Front-End Developer</p>
			</div>

			<div className='flex flex-col items-center gap-3'>
				{links.map(({ label, href, icon: Icon }) => (
					<a
						key={label}
						href={href}
						target={href.startsWith('/') ? undefined : '_blank'}
						rel={href.startsWith('/') ? undefined : 'noreferrer'}
						className='group flex min-h-14 w-full max-w-[620px] items-center gap-3 rounded-xl border border-card-border bg-card px-4 py-3 text-text transition-colors duration-200 hover:border-border-hover hover:bg-hover-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
					>
						<span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-card-border text-xl'>
							<Icon aria-hidden='true' />
						</span>
						<span className='flex-1 text-[0.95rem] font-semibold'>{label}</span>
						<FiArrowUpRight className='text-secondary transition-colors duration-200 group-hover:text-text' aria-hidden='true' />
					</a>
				))}
			</div>
		</div>
	</main>
)

export default Links
