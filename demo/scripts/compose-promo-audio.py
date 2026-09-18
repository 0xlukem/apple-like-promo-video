"""Original 25-second electronic score and sound design; no external samples.

Install numpy and scipy, then run from any directory. The composition reads the
same frame events as the Remotion film. All randomness is seeded.
"""
from pathlib import Path
import json
import numpy as np
from scipy import signal
from scipy.io import wavfile

ROOT=Path(__file__).resolve().parents[1]
T=json.loads((ROOT/'src/promo/timeline.json').read_text())
SR=48000
DURATION=T['frames']/T['fps']
N=int(DURATION*SR)
rng=np.random.default_rng(71429)
music=np.zeros((N,2),np.float64)
sfx=np.zeros_like(music)
beat=60/T['bpm']

def sec(event): return T[event]/T['fps']
def midi(n): return 440*2**((n-69)/12)
def grid(duration): return np.arange(round(duration*SR))/SR
def filter_audio(x,cutoff,kind='lowpass',order=2):
    return signal.sosfilt(signal.butter(order,cutoff,btype=kind,fs=SR,output='sos'),x)
def env(t,attack,decay,release=.04):
    return np.minimum(1,t/attack)*np.exp(-t/decay)*np.minimum(1,np.maximum(0,(t[-1]-t)/release))
def add(bus,x,start,gain=1,pan=0):
    pos=round(start*SR)
    if pos<0: x=x[-pos:];pos=0
    length=min(len(x),N-pos)
    if length<=0:return
    x=x[:length]
    if x.ndim==1:
        # Equal-power stereo placement, including moving cues.
        p=np.broadcast_to(pan,(len(x),)) if np.isscalar(pan) else np.asarray(pan)[:length]
        lr=np.stack([np.cos((p+1)*np.pi/4),np.sin((p+1)*np.pi/4)],axis=1)
        x=x[:,None]*lr
    bus[pos:pos+length]+=x*gain

def kick():
    t=grid(.42)
    phase=2*np.pi*(47*t+98*.024*(1-np.exp(-t/.024)))
    body=np.sin(phase)*np.exp(-t/.12)
    tap=filter_audio(rng.normal(size=len(t)),2800)*np.exp(-t/.003)*.14
    return np.tanh(1.5*(body+tap))*np.minimum(1,t/.0015)

def rim():
    t=grid(.16)
    modes=sum(np.sin(2*np.pi*f*t)*np.exp(-t/d) for f,d in [(790,.014),(1241,.011),(1897,.007)])*.13
    noise=filter_audio(rng.normal(size=len(t)),[1700,6800],'bandpass')*.15*np.exp(-t/.018)
    return (modes+noise)*np.minimum(1,t/.0008)

def hat(open_hat=False):
    t=grid(.22 if open_hat else .055)
    x=filter_audio(rng.normal(size=len(t)),[6200,13200],'bandpass')
    return x*np.exp(-t/(.045 if open_hat else .011))*np.minimum(1,t/.0007)

def bass(note,duration=.3):
    t=grid(duration);f=midi(note)
    # A rounded fundamental with a short-lived harmonic edge.
    x=.85*np.sin(2*np.pi*f*t)+.18*np.sin(2*np.pi*f*2*t)
    x+=sum(np.sin(2*np.pi*f*h*t)/(h*h) for h in range(3,10))*.5*np.exp(-t/.08)
    return np.tanh(x*1.3)*env(t,.006,.19,.035)

def pluck(note,duration=1.1):
    t=grid(duration);f=midi(note)
    mod=2.5*np.sin(2*np.pi*f*2*t)*np.exp(-t/.045)
    x=np.sin(2*np.pi*f*t+mod)*np.exp(-t/.21)
    x+=.18*np.sin(2*np.pi*f*3.005*t)*np.exp(-t/.06)
    attack=filter_audio(rng.normal(size=len(t)),3400)*np.exp(-t/.003)*.06
    return (x+attack)*np.minimum(1,t/.002)*np.minimum(1,(t[-1]-t)/.03)

def chord(notes,duration):
    t=grid(duration);left=np.zeros_like(t);right=np.zeros_like(t)
    for note in notes:
        f=midi(note)
        for h in range(1,7):
            a=1/(h*h)
            left+=a*np.sin(2*np.pi*f*h*.9987*t+.13*h)
            right+=a*np.sin(2*np.pi*f*h*1.0013*t-.13*h)
    envelope=np.minimum(1,t/.23)*np.minimum(1,np.maximum(0,(duration-t)/.5))
    return np.stack([left,right],axis=1)*envelope[:,None]/len(notes)

def airy(length,center=2300):
    t=grid(length)
    noise=filter_audio(rng.normal(size=len(t)),[420,center*2],'bandpass')
    envelope=np.sin(np.pi*t/length)**2
    metallic=np.sin(2*np.pi*(center*.45*t+80*t*t))*np.exp(-t/length)*.09
    return (noise*.48+metallic)*envelope

def impact():
    t=grid(.63)
    low=np.sin(2*np.pi*(52*t+48*.045*(1-np.exp(-t/.045))))*np.exp(-t/.095)
    contact=filter_audio(rng.normal(size=len(t)),[250,3000],'bandpass')*np.exp(-t/.014)*.65
    metal=.17*np.sin(2*np.pi*391*t)*np.exp(-t/.062)
    return np.tanh((low*.7+contact+metal)*1.6)*np.minimum(1,t/.001)

# Deliberately underwhelming opening. It cuts off at the X rather than leaking
# through the dramatic pause.
for k,note in enumerate([64,64,64,64,64]):
    add(music,filter_audio(pluck(note,.35),950),.18+k*.48,.055)
music[round(sec('xStart')*SR):]=0
add(sfx,airy(.11,1700),sec('xArrival')-.115,.32)
add(sfx,impact(),sec('xArrival'),.55)
# Let the interruption stop. No padded music across the silence.
sfx[round(3.29*SR):round(sec('phraseStart')*SR)]=0

# An identifiable pitched motif establishes the new sonic language.
motif=[(0,69),(.5,76),(1.25,72),(1.75,71)]
for offset,note in motif:
    add(music,pluck(note),sec('phraseStart')+offset*beat,.10,pan=-.25+offset*.25)
    add(music,pluck(note),sec('phraseStart')+offset*beat+.1875,.028,pan=.55-offset*.18)
add(sfx,airy(.24,2100),sec('phraseArrival')-.24,.13,pan=np.linspace(-.55,.35,round(.24*SR)))
add(sfx,pluck(57,.22),sec('phraseArrival'),.09)
add(sfx,airy(.26,3500),sec('insteadArrival')-.26,.19)
add(sfx,rim(),sec('insteadArrival'),.38)

# The groove grows with the code, opens for the product, then thins for the CTA.
music_start=sec('codeStart')
roots=[45,41,38,43]
chords=[[57,60,64,71],[53,57,60,64],[50,57,60,64],[55,59,62,69]]
end=sec('ctaStart')
for bar in range(int(np.ceil((end-music_start)/(4*beat)))):
    start=music_start+bar*4*beat
    if start>=end:break
    root=roots[bar%4]
    intensity=.70 if start<sec('heroStart') else 1.0
    add(music,chord(chords[bar%4],2.4),start,.070*intensity)
    for off,step in [(0,0),(.75,12),(1.5,0),(2.75,7),(3.5,12)]:
        at=start+off*beat
        if at<end:add(music,bass(root+step,.28),at,.235*intensity)
    for off in [0,1,2,3]:
        at=start+off*beat
        if at<end:add(music,kick(),at,.24*intensity)
    for off in [1,3]:
        at=start+off*beat
        if at<end:add(music,rim(),at,.46*intensity,.14)
        if at<end:add(music,rim(),at+.018,.17*intensity,-.25)
    for i in range(16):
        at=start+i*.25*beat+(.012 if i%2 else 0)
        if at<end:add(music,hat(i in [6,14]),at,(.032 if i%2 else .052)*intensity,(-.35 if i%2 else .3))
    if True:
        for off,note in motif:
            at=start+(off+.25)*beat
            if at<end:
                add(music,pluck(note+(-3 if bar%4==2 else 0)),at,.083*intensity,pan=-.4+off*.4)
                add(music,pluck(note+(-3 if bar%4==2 else 0)),at+.1875,.023*intensity,pan=.4-off*.3)

# Additional bright offbeat octave figures give the score forward motion.
for step in range(int((end-music_start)/beat)):
    at=music_start+(step+.5)*beat
    if at<end:
        note=[81,84,88,83][(step//4)%4]
        add(music,pluck(note,.38),at,.047,(-.4 if step%2 else .4))

# Code accents are dry, quick and tuned to the score, not one stock click repeated.
for i,f in enumerate(T['codeAccents']):
    at=f/T['fps']
    add(sfx,pluck([81,76,79,72,88][i],.19),at,.075,pan=[-.6,.35,-.3,.5,0][i])
    add(sfx,airy(.065,2400+i*210),at-.045,.075,pan=[-.6,.35,-.3,.5,0][i])

# A physical-feeling sweep follows the 180-degree turn's velocity and travels
# across the stereo field. It resolves on the exact shared spinEnd frame.
spin_length=sec('spinEnd')-sec('heroStart')
add(sfx,airy(spin_length,1750),sec('heroStart'),.23,pan=np.linspace(-.75,.75,round(spin_length*SR)))
add(sfx,impact(),sec('heroStart'),.33)
add(sfx,pluck(57,.8),sec('spinEnd'),.12)
add(sfx,pluck(76,1.0),sec('spinEnd')+.035,.042,.4)
add(sfx,airy(.48,2800),sec('macroStart')-.24,.17,-.3)

# Subtraction marks the comparison. The thin side rebuilds into the full mix.
comparison=round(sec('comparisonStart')*SR);wipe_end=round(sec('wipeEnd')*SR)
music[comparison:wipe_end]*=np.linspace(.28,1,wipe_end-comparison)[:,None]
for event in ['sameStart','impactStart']:
    at=sec(event)
    add(sfx,airy(.16,1900),at-.12,.11)
    add(sfx,rim(),at+.02,.17)
add(sfx,airy(sec('wipeEnd')-sec('wipeStart'),1400),sec('wipeStart'),.11,np.linspace(-.6,.6,round((sec('wipeEnd')-sec('wipeStart'))*SR)))

# The closing title lands on a distinct, resolving chord, with no extra loop.
cta=sec('ctaStart')
release_start=round((cta-.12)*SR)
music[release_start:round(cta*SR)]*=np.linspace(1,0,round(cta*SR)-release_start)[:,None]
music[round(cta*SR):]=0
add(music,chord([45,57,60,64,71],DURATION-cta),cta,.11)
for off,note in [(0,69),(.12,76),(.3,81)]:add(music,pluck(note,2.0),sec('ctaArrival')+off,.07,off*1.5-.2)
add(sfx,airy(.45,2200),sec('ctaArrival')-.45,.16)
add(sfx,impact()*.45,sec('ctaArrival'),.19)

# Keep the faster groove alive during the letters' fall and recovery.
for k in range(8):
    at=cta+k*beat
    if at<sec('ctaSettle'):
        add(music,kick(),at,.18)
        add(music,bass([45,45,52,57][k%4],.2),at+.5*beat,.14)
        add(music,hat(),at+.5*beat,.05,(-.3 if k%2 else .3))
        if k%2:add(music,rim(),at,.28)
for event,gain in [('insteadArrival',.19),('impactStart',.22),('ctaFall',.10),('ctaSettle',.15)]:
    add(sfx,impact(),sec(event),gain)
for i in range(6):
    add(sfx,rim(),sec('ctaFall')+i*2/T['fps'],.11,pan=-.5+i*.16)
add(sfx,airy((T['ctaSettle']-T['ctaRecover'])/T['fps'],2400),sec('ctaRecover'),.11)
for note in [69,76,81]:add(music,pluck(note,.9),sec('ctaSettle'),.065)

# Short asymmetric reflections create depth while keeping attacks crisp.
dry=music.copy()
for delay,gain in [(.113,.08),(.227,.06),(.359,.042),(.541,.027)]:
    d=round(delay*SR);music[d:]+=dry[:-d,::-1]*gain
dry=sfx.copy()
for delay,gain in [(.041,.07),(.083,.045),(.139,.025)]:
    d=round(delay*SR);sfx[d:]+=dry[:-d,::-1]*gain

# Preserve the hard pause, and fade all tails inside the final video frame.
a=round(3.33*SR);b=round(sec('phraseStart')*SR)
music[a:b]=0;sfx[a:b]=0
tail=round(sec('audioTailEnd')*SR);fade=round(.24*SR)
for bus in [music,sfx]:
    bus[tail-fade:tail]*=np.linspace(1,0,fade)[:,None]
    bus[tail:]=0
    bus[:round(.015*SR)]*=np.linspace(0,1,round(.015*SR))[:,None]

mix=music+sfx
# One shared gentle saturation curve keeps the stems summing to the master.
compressed=np.tanh(mix*1.15)/1.15
ratio=np.divide(compressed,mix,out=np.ones_like(mix),where=np.abs(mix)>1e-12)
music*=ratio;sfx*=ratio;mix=music+sfx
gain=.79/max(.01,np.max(np.abs(mix)))
out=ROOT/'public/promo';out.mkdir(parents=True,exist_ok=True)
for name,data in [('music',music),('sound-design',sfx)]:
    wavfile.write(out/f'{name}.wav',SR,np.int16(np.clip(data*gain,-1,1)*32767))
report={'sample_rate':SR,'seconds':DURATION,'seed':71429,'peak_before_delivery_master_dbfs':float(20*np.log10(np.max(np.abs(mix))*gain)),'music':'Original 144 BPM electronic motif, syncopated bass, tuned plucks, percussion and resolved closing harmony','sfx':'Original impacts, tuned code accents and a stereo sweep following the two-second 180-degree product turn','events':T}
print(json.dumps({k:v for k,v in report.items() if k!='events'},indent=2))
