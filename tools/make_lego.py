import sys,re
src,inj,out=sys.argv[1:4]
s=open(src,encoding='utf-8').read()
js=open(inj,encoding='utf-8').read()
s=s.replace('<title>O balcão da vó</title>','<title>O balcão da vó (versão tijolinhos)</title>',1)
i=s.rindex('</body>')
s=s[:i]+'<script>\n'+js+'\n</script>\n'+s[i:]
open(out,'w',encoding='utf-8').write(s);print(len(s))
