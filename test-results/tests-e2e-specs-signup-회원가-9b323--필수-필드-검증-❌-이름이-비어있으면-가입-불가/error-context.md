# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - img [ref=e5] [cursor=pointer]
        - paragraph
        - generic [ref=e7]: 1/6
    - main [ref=e9]:
      - generic [ref=e10]:
        - generic [ref=e11]:
          - heading "이름을 입력해주세요" [level=1] [ref=e12]
          - generic [ref=e13]:
            - textbox "이름" [ref=e16]
            - paragraph [ref=e17]: 성까지 포함한 이름을 입력해 주세요.
        - button "다음" [disabled] [ref=e19]
  - button "Open Next.js Dev Tools" [ref=e25] [cursor=pointer]:
    - img [ref=e26]
  - alert [ref=e29]
```