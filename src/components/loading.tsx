import { SVGProps } from 'react'

export function LoadingSpin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className='animate-spin -ml-1 text-white h-4 w-4'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      {...props}
    >
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        stroke-width='4'
      ></circle>
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      ></path>
    </svg>
  )
}

export function Loading(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      version='1.1'
      id='L2'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 100 100'
      enableBackground='new 0 0 100 100'
      {...props}
    >
      <circle
        fill='none'
        stroke='#fff'
        strokeWidth='4'
        strokeMiterlimit='10'
        cx='50'
        cy='50'
        r='48'
      />
      <line
        fill='none'
        strokeLinecap='round'
        stroke='#fff'
        strokeWidth='4'
        strokeMiterlimit='10'
        x1='50'
        y1='50'
        x2='85'
        y2='50.5'
      >
        <animateTransform
          attributeName='transform'
          dur='2s'
          type='rotate'
          from='0 50 50'
          to='360 50 50'
          repeatCount='indefinite'
        />
      </line>
      <line
        fill='none'
        strokeLinecap='round'
        stroke='#fff'
        strokeWidth='4'
        strokeMiterlimit='10'
        x1='50'
        y1='50'
        x2='49.5'
        y2='74'
      >
        <animateTransform
          attributeName='transform'
          dur='15s'
          type='rotate'
          from='0 50 50'
          to='360 50 50'
          repeatCount='indefinite'
        />
      </line>
    </svg>
  )
}
