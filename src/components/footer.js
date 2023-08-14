import React from "react";

function Footer() {
  return (
    <footer class="site-footer">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-7">
            <div class="site-footer__copyright">
              <p>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clipRule="evenodd"
                    d="M0.729492 6.99984C0.729492 3.53659 3.53708 0.729004 7.00033 0.729004C10.4636 0.729004 13.2712 3.53659 13.2712 6.99984C13.2712 10.4631 10.4636 13.2707 7.00033 13.2707C3.53708 13.2707 0.729492 10.4631 0.729492 6.99984ZM7.00033 1.604C5.56926 1.604 4.19681 2.17249 3.18489 3.18441C2.17298 4.19632 1.60449 5.56877 1.60449 6.99984C1.60449 8.4309 2.17298 9.80335 3.18489 10.8153C4.19681 11.8272 5.56926 12.3957 7.00033 12.3957C8.43139 12.3957 9.80384 11.8272 10.8158 10.8153C11.8277 9.80335 12.3962 8.4309 12.3962 6.99984C12.3962 5.56877 11.8277 4.19632 10.8158 3.18441C9.80384 2.17249 8.43139 1.604 7.00033 1.604Z"
                    fill="#979797"
                  />
                  <path
                    fill-rule="evenodd"
                    clipRule="evenodd"
                    d="M7.16716 5.10401C5.99874 5.10401 5.10449 5.98076 5.10449 6.99984C5.10449 8.01892 5.99874 8.89567 7.16716 8.89567C7.46524 8.89567 7.74758 8.83734 8.00133 8.73409C8.05453 8.71237 8.11149 8.70135 8.16895 8.70164C8.22641 8.70194 8.28325 8.71355 8.33623 8.73581C8.38921 8.75807 8.43728 8.79055 8.4777 8.83139C8.51812 8.87224 8.55011 8.92064 8.57183 8.97384C8.59354 9.02704 8.60457 9.084 8.60427 9.14146C8.60398 9.19893 8.59237 9.25577 8.5701 9.30874C8.54784 9.36172 8.51536 9.40979 8.47452 9.45022C8.43368 9.49064 8.38528 9.52262 8.33208 9.54434C7.96207 9.69444 7.56645 9.77131 7.16716 9.77067C5.57349 9.77067 4.22949 8.55792 4.22949 6.99984C4.22949 5.44176 5.57349 4.22901 7.16716 4.22901C7.56645 4.22837 7.96207 4.30524 8.33208 4.45534C8.4396 4.49912 8.52533 4.58383 8.5704 4.69082C8.61547 4.79781 8.61619 4.91832 8.57241 5.02584C8.52863 5.13336 8.44392 5.21909 8.33693 5.26416C8.22994 5.30923 8.10943 5.30996 8.00191 5.26617C7.7368 5.15853 7.45329 5.10345 7.16716 5.10401Z"
                    fill="#979797"
                  />
                </svg>
                Powered by Quicksilver Protocol
              </p>
              <ul class="list-reset">
                <li>
                  <a href="#">Terms of Use</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="site-footer__socials">
              <ul class="social-icons list-reset">
                <li>
                  <a
                    href="https://discord.com/invite/xrSmYMDVrQ"
                    target="_blank"
                    rel="nofollow noreferrer"
                    title="Discord"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_50_4717)">
                        <path
                          d="M17.4031 12.2618L15.3281 4.07813C15.2735 3.86508 15.158 3.67258 14.9956 3.52421C14.8333 3.37585 14.6312 3.27805 14.4141 3.24281L11.8786 2.82656C11.5991 2.78161 11.3128 2.84222 11.0755 2.9966C10.8382 3.15099 10.6669 3.38812 10.5947 3.66188L10.5799 3.72164C10.5704 3.75961 10.5688 3.79916 10.5754 3.83775C10.5821 3.87635 10.5966 3.91314 10.6183 3.94577C10.6399 3.9784 10.6681 4.00615 10.7011 4.02725C10.7341 4.04834 10.7711 4.06232 10.8098 4.06828C11.3916 4.15367 11.9656 4.28581 12.5262 4.46344C12.6663 4.50572 12.7851 4.59972 12.8585 4.72638C12.9319 4.85304 12.9544 5.00286 12.9213 5.14547C12.9024 5.21978 12.8684 5.28943 12.8215 5.35013C12.7746 5.41084 12.7158 5.46131 12.6487 5.49845C12.5816 5.53559 12.5076 5.55862 12.4313 5.56611C12.355 5.57361 12.2779 5.56541 12.2048 5.54203C10.1249 4.90414 7.90184 4.9017 5.82047 5.535C5.67962 5.58236 5.52593 5.57365 5.39133 5.51067C5.25673 5.44769 5.15156 5.33528 5.09766 5.1968C5.07204 5.12573 5.061 5.05024 5.06519 4.97482C5.06939 4.8994 5.08873 4.82559 5.12206 4.7578C5.1554 4.69002 5.20204 4.62964 5.25922 4.58028C5.31639 4.53091 5.38293 4.49356 5.45485 4.47047C6.02241 4.28969 6.60369 4.15519 7.19297 4.06828C7.23167 4.06232 7.2687 4.04834 7.30169 4.02725C7.33467 4.00615 7.36289 3.9784 7.38454 3.94577C7.40618 3.91314 7.42077 3.87635 7.42738 3.83775C7.43398 3.79916 7.43246 3.75961 7.4229 3.72164L7.40813 3.66188C7.33595 3.38789 7.16431 3.15061 6.92668 2.9963C6.68905 2.842 6.40247 2.78174 6.12282 2.82727L3.58594 3.24352C3.36894 3.2787 3.1669 3.37639 3.00456 3.52463C2.84221 3.67286 2.7266 3.86521 2.67188 4.07813L0.596958 12.2618C0.531899 12.519 0.560214 12.791 0.676863 13.0293C0.793513 13.2677 0.990931 13.4569 1.23399 13.5633L5.94493 15.6523C6.08658 15.7152 6.23961 15.7486 6.39462 15.7502C6.54963 15.7519 6.70335 15.7218 6.84631 15.6619C6.98928 15.602 7.11848 15.5135 7.22598 15.4018C7.33348 15.2901 7.417 15.1576 7.47141 15.0124L7.7168 14.348C7.73142 14.3082 7.73686 14.2656 7.7327 14.2234C7.72854 14.1812 7.71489 14.1405 7.69278 14.1043C7.67067 14.0681 7.64066 14.0374 7.60501 14.0145C7.56935 13.9915 7.52897 13.9769 7.48688 13.9718C6.80382 13.8891 6.12991 13.7431 5.47383 13.5359C5.33427 13.4934 5.21597 13.3997 5.14278 13.2735C5.06958 13.1474 5.04693 12.9981 5.07938 12.8559C5.09819 12.7814 5.13207 12.7115 5.17893 12.6506C5.22579 12.5897 5.28464 12.539 5.35185 12.5017C5.41905 12.4645 5.49319 12.4413 5.56967 12.4338C5.64616 12.4263 5.72338 12.4345 5.79657 12.458C7.88434 13.0973 10.1157 13.0973 12.2034 12.458C12.2765 12.4346 12.3536 12.4264 12.43 12.434C12.5064 12.4415 12.5804 12.4646 12.6475 12.5018C12.7146 12.539 12.7734 12.5896 12.8203 12.6504C12.8671 12.7111 12.901 12.7809 12.9199 12.8552C12.9528 12.9976 12.9303 13.147 12.857 13.2734C12.7838 13.3998 12.6653 13.4936 12.5255 13.5359C11.8697 13.7432 11.196 13.8892 10.5131 13.9718C10.471 13.9769 10.4307 13.9915 10.395 14.0145C10.3593 14.0374 10.3293 14.0681 10.3072 14.1043C10.2851 14.1405 10.2715 14.1812 10.2673 14.2234C10.2632 14.2656 10.2686 14.3082 10.2832 14.348L10.5286 15.0124C10.5831 15.1575 10.6667 15.2899 10.7742 15.4016C10.8817 15.5132 11.0109 15.6017 11.1538 15.6616C11.2968 15.7215 11.4504 15.7516 11.6054 15.75C11.7604 15.7484 11.9134 15.7151 12.0551 15.6523L16.766 13.5633C17.0091 13.4569 17.2065 13.2677 17.3231 13.0293C17.4398 12.791 17.4681 12.519 17.4031 12.2618ZM6.46875 10.6875C6.30188 10.6875 6.13875 10.638 5.99999 10.5453C5.86124 10.4526 5.75309 10.3208 5.68923 10.1666C5.62537 10.0125 5.60866 9.84281 5.64122 9.67914C5.67377 9.51547 5.75413 9.36513 5.87213 9.24713C5.99013 9.12913 6.14048 9.04877 6.30415 9.01621C6.46782 8.98366 6.63747 9.00037 6.79164 9.06423C6.94582 9.12809 7.0776 9.23623 7.17031 9.37499C7.26302 9.51374 7.3125 9.67687 7.3125 9.84375C7.3125 10.0675 7.22361 10.2821 7.06538 10.4404C6.90714 10.5986 6.69253 10.6875 6.46875 10.6875ZM11.5313 10.6875C11.3644 10.6875 11.2012 10.638 11.0625 10.5453C10.9237 10.4526 10.8156 10.3208 10.7517 10.1666C10.6879 10.0125 10.6712 9.84281 10.7037 9.67914C10.7363 9.51547 10.8166 9.36513 10.9346 9.24713C11.0526 9.12913 11.203 9.04877 11.3666 9.01621C11.5303 8.98366 11.7 9.00037 11.8541 9.06423C12.0083 9.12809 12.1401 9.23623 12.2328 9.37499C12.3255 9.51374 12.375 9.67687 12.375 9.84375C12.375 10.0675 12.2861 10.2821 12.1279 10.4404C11.9696 10.5986 11.755 10.6875 11.5313 10.6875Z"
                          fill="currentColor"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_50_4717">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://medium.com/quicksilverzone"
                    target="_blank"
                    rel="nofollow noreferrer"
                    title="Medium"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_50_4720)">
                        <path
                          d="M9.5625 9C9.5625 9.89002 9.29858 10.76 8.80412 11.5001C8.30965 12.2401 7.60684 12.8169 6.78458 13.1575C5.96231 13.4981 5.05751 13.5872 4.1846 13.4135C3.31168 13.2399 2.50986 12.8113 1.88052 12.182C1.25119 11.5526 0.822602 10.7508 0.648968 9.87791C0.475335 9.00499 0.56445 8.10019 0.905044 7.27792C1.24564 6.45566 1.82241 5.75285 2.56244 5.25839C3.30246 4.76392 4.17249 4.5 5.0625 4.5C6.25558 4.5013 7.39941 4.97583 8.24304 5.81946C9.08667 6.66309 9.5612 7.80693 9.5625 9ZM12.9375 4.5C12.5381 4.5 11.7844 4.69406 11.2275 5.99414C10.8795 6.80625 10.6875 7.875 10.6875 9C10.6875 10.125 10.8795 11.1937 11.2275 12.0059C11.7844 13.3059 12.5381 13.5 12.9375 13.5C13.3369 13.5 14.0906 13.3059 14.6475 12.0059C14.9955 11.1937 15.1875 10.125 15.1875 9C15.1875 7.875 14.9955 6.80625 14.6475 5.99414C14.0906 4.69406 13.3369 4.5 12.9375 4.5ZM16.875 4.5C16.7258 4.5 16.5827 4.55926 16.4773 4.66475C16.3718 4.77024 16.3125 4.91332 16.3125 5.0625V12.9375C16.3125 13.0867 16.3718 13.2298 16.4773 13.3352C16.5827 13.4407 16.7258 13.5 16.875 13.5C17.0242 13.5 17.1673 13.4407 17.2728 13.3352C17.3782 13.2298 17.4375 13.0867 17.4375 12.9375V5.0625C17.4375 4.91332 17.3782 4.77024 17.2728 4.66475C17.1673 4.55926 17.0242 4.5 16.875 4.5Z"
                          fill="currentColor"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_50_4720">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/channel/UCFHGQ7SAtIyAlNHewNNVU1A "
                    target="_blank"
                    rel="nofollow noopener"
                    title="Youtube"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_50_4723)">
                        <path
                          d="M16.4763 4.88813C16.4101 4.62892 16.2831 4.38918 16.106 4.18868C15.9289 3.98819 15.7066 3.83268 15.4575 3.735C13.0472 2.80407 9.21094 2.8125 9 2.8125C8.78906 2.8125 4.95281 2.80407 2.5425 3.735C2.29343 3.83268 2.07115 3.98819 1.894 4.18868C1.71686 4.38918 1.58992 4.62892 1.52367 4.88813C1.34156 5.58985 1.125 6.87235 1.125 9C1.125 11.1277 1.34156 12.4102 1.52367 13.1119C1.58983 13.3712 1.71672 13.6111 1.89387 13.8117C2.07102 14.0123 2.29335 14.168 2.5425 14.2657C4.85156 15.1566 8.46562 15.1875 8.95359 15.1875H9.04641C9.53438 15.1875 13.1505 15.1566 15.4575 14.2657C15.7067 14.168 15.929 14.0123 16.1061 13.8117C16.2833 13.6111 16.4102 13.3712 16.4763 13.1119C16.6584 12.4088 16.875 11.1277 16.875 9C16.875 6.87235 16.6584 5.58985 16.4763 4.88813ZM11.4061 9.23414L8.03109 11.4841C7.98873 11.5124 7.93948 11.5286 7.88861 11.5311C7.83774 11.5336 7.78715 11.5222 7.74225 11.4981C7.69735 11.4741 7.65982 11.4383 7.63367 11.3946C7.60751 11.3509 7.59372 11.3009 7.59375 11.25V6.75C7.59372 6.69907 7.60751 6.64909 7.63367 6.60539C7.65982 6.56169 7.69735 6.52591 7.74225 6.50187C7.78715 6.47783 7.83774 6.46643 7.88861 6.4689C7.93948 6.47136 7.98873 6.4876 8.03109 6.51586L11.4061 8.76586C11.4447 8.79154 11.4763 8.82634 11.4982 8.86719C11.5201 8.90804 11.5315 8.95366 11.5315 9C11.5315 9.04634 11.5201 9.09196 11.4982 9.13281C11.4763 9.17366 11.4447 9.20847 11.4061 9.23414Z"
                          fill="currentColor"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_50_4723">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/quicksilverzone"
                    target="_blank"
                    rel="nofollow noreferrer"
                    title="Telegram"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_50_4726)">
                        <path
                          d="M16.6556 1.84148C16.5684 1.76622 16.4624 1.71617 16.3489 1.69672C16.2354 1.67727 16.1188 1.68915 16.0115 1.73109L1.762 7.30757C1.56005 7.3861 1.38907 7.52811 1.27482 7.71221C1.16056 7.89632 1.1092 8.11256 1.12848 8.32838C1.14775 8.5442 1.23661 8.74792 1.38168 8.90886C1.52676 9.06981 1.72019 9.17927 1.93285 9.22077L5.62496 9.9457V14.0625C5.62424 14.2867 5.69088 14.506 5.81624 14.6919C5.94161 14.8779 6.11993 15.0218 6.32809 15.1052C6.53593 15.1901 6.76449 15.2105 6.98406 15.1637C7.20364 15.1169 7.40406 15.0052 7.55926 14.843L9.33957 12.9966L12.164 15.4687C12.3678 15.6495 12.6306 15.7495 12.903 15.75C13.0224 15.7499 13.141 15.7312 13.2546 15.6944C13.4402 15.6356 13.6071 15.5291 13.7387 15.3856C13.8703 15.2421 13.9621 15.0667 14.0048 14.8767L16.8588 2.46093C16.8843 2.34896 16.8789 2.23215 16.8431 2.12302C16.8073 2.0139 16.7425 1.91657 16.6556 1.84148ZM12.9044 14.625L7.09098 9.52734L15.4582 3.53038L12.9044 14.625Z"
                          fill="currentColor"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_50_4726">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/quicksilverzone"
                    target="_blank"
                    rel="nofollow noreferrer"
                    title="Twitter"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_50_4729)">
                        <path
                          d="M17.273 5.46047L15.1706 7.56281C14.7459 12.4861 10.594 16.3125 5.625 16.3125C4.60407 16.3125 3.76243 16.1508 3.12329 15.8316C2.60789 15.5735 2.39696 15.2972 2.34422 15.2184C2.2972 15.1479 2.26672 15.0677 2.25507 14.9837C2.24341 14.8998 2.25088 14.8143 2.27691 14.7336C2.30294 14.653 2.34686 14.5792 2.40539 14.5179C2.46392 14.4566 2.53555 14.4093 2.61493 14.3796C2.63321 14.3726 4.3193 13.725 5.39016 12.4924C4.79629 12.0042 4.27787 11.4308 3.85172 10.7909C2.97985 9.4964 2.00391 7.24781 2.30485 3.88758C2.31439 3.7808 2.35424 3.67898 2.41971 3.5941C2.48517 3.50921 2.57353 3.4448 2.67438 3.40845C2.77523 3.3721 2.88436 3.36533 2.98893 3.38892C3.0935 3.41252 3.18915 3.4655 3.26461 3.54164C3.28922 3.56625 5.60461 5.86898 8.4354 6.6157V6.1875C8.43432 5.73848 8.52309 5.29378 8.6965 4.87959C8.8699 4.46541 9.12443 4.0901 9.44508 3.77578C9.7565 3.46481 10.127 3.21936 10.5349 3.05391C10.9427 2.88847 11.3795 2.80638 11.8195 2.8125C12.4099 2.81832 12.9886 2.97678 13.4996 3.27249C14.0105 3.56819 14.4362 3.99106 14.7354 4.5H16.875C16.9863 4.49991 17.0952 4.53285 17.1877 4.59465C17.2803 4.65646 17.3525 4.74434 17.3951 4.84718C17.4377 4.95002 17.4489 5.06318 17.4271 5.17236C17.4054 5.28153 17.3517 5.3818 17.273 5.46047Z"
                          fill="currentColor"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_50_4729">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.quicksilver.zone/ "
                    target="_blank"
                    rel="nofollow noopener"
                    title="Quicksilver docs"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_50_4732)">
                        <path
                          d="M15.1875 2.25V13.5C15.1875 13.6492 15.1282 13.7923 15.0227 13.8977C14.9173 14.0032 14.7742 14.0625 14.625 14.0625H5.0625C4.76413 14.0625 4.47798 14.181 4.267 14.392C4.05603 14.603 3.9375 14.8891 3.9375 15.1875H13.5C13.6492 15.1875 13.7923 15.2468 13.8977 15.3523C14.0032 15.4577 14.0625 15.6008 14.0625 15.75C14.0625 15.8992 14.0032 16.0423 13.8977 16.1477C13.7923 16.2532 13.6492 16.3125 13.5 16.3125H3.375C3.22582 16.3125 3.08274 16.2532 2.97725 16.1477C2.87176 16.0423 2.8125 15.8992 2.8125 15.75V3.9375C2.8125 3.34076 3.04955 2.76847 3.47151 2.34651C3.89347 1.92455 4.46576 1.6875 5.0625 1.6875H14.625C14.7742 1.6875 14.9173 1.74676 15.0227 1.85225C15.1282 1.95774 15.1875 2.10082 15.1875 2.25Z"
                          fill="currentColor"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_50_4732">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_50_4735)">
                        <path
                          d="M9 1.6875C7.55373 1.6875 6.13993 2.11637 4.9374 2.91988C3.73486 3.72339 2.7976 4.86544 2.24413 6.20163C1.69067 7.53781 1.54586 9.00811 1.82801 10.4266C2.11017 11.8451 2.80661 13.148 3.82928 14.1707C4.85196 15.1934 6.15492 15.8898 7.57341 16.172C8.99189 16.4541 10.4622 16.3093 11.7984 15.7559C13.1346 15.2024 14.2766 14.2651 15.0801 13.0626C15.8836 11.8601 16.3125 10.4463 16.3125 9C16.3105 7.06123 15.5394 5.20246 14.1685 3.83154C12.7975 2.46063 10.9388 1.68955 9 1.6875ZM14.5104 6.1875H12.0192C11.7322 5.05794 11.2501 3.98717 10.5947 3.02344C11.432 3.24845 12.213 3.64621 12.8873 4.19114C13.5617 4.73606 14.1146 5.4161 14.5104 6.1875ZM9 2.82023C9.84375 3.7343 10.4766 4.89797 10.8541 6.1875H7.14586C7.52344 4.89797 8.15625 3.7357 9 2.82023ZM6.75 9C6.7501 8.43458 6.79713 7.87014 6.89063 7.3125H11.1094C11.2959 8.42977 11.2959 9.57023 11.1094 10.6875H6.89063C6.79713 10.1299 6.7501 9.56542 6.75 9ZM7.14586 11.8125H10.8541C10.4766 13.102 9.84375 14.2643 9 15.1798C8.15625 14.2643 7.52344 13.102 7.14586 11.8125ZM10.5947 14.9766C11.2501 14.0128 11.7322 12.9421 12.0192 11.8125H14.5104C14.1146 12.5839 13.5617 13.2639 12.8873 13.8089C12.213 14.3538 11.432 14.7515 10.5947 14.9766ZM12.2491 10.6875C12.417 9.56876 12.417 8.43124 12.2491 7.3125H14.9534C15.2656 8.41584 15.2656 9.58416 14.9534 10.6875H12.2491Z"
                          fill="currentColor"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_50_4735">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
