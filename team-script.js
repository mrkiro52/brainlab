// Team member data
const teamData = {
    1: {
        name: "Dr. Anna Petrova",
        position: "Laboratory Director",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600",
        bio: "Dr. Anna Petrova is the founder and director of BrainLab. She received her PhD in Computer Science from Moscow Institute of Physics and Technology (MIPT) in 2015, focusing on theoretical foundations of deep learning. Her research has been published in top-tier venues including NeurIPS, ICML, and ICLR.",
        expertise: ["Deep Learning Theory", "Neural Network Optimization", "Generalization Bounds"],
        education: "PhD in Computer Science, MIPT (2015)",
        publications: "50+ papers in top ML conferences",
        links: [
            { label: "Google Scholar", url: "#" },
            { label: "GitHub", url: "#" },
            { label: "Personal Website", url: "#" }
        ]
    },
    2: {
        name: "Prof. Mikhail Sokolov",
        position: "Deputy Director",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600",
        bio: "Prof. Mikhail Sokolov is a leading expert in optimization algorithms for machine learning. Before joining BrainLab, he was a professor at Moscow State University. He has over 20 years of experience in mathematical optimization and has supervised more than 30 PhD students.",
        expertise: ["Optimization Algorithms", "Convex Analysis", "Distributed Computing"],
        education: "PhD in Applied Mathematics, MSU (2005)",
        publications: "80+ papers, h-index: 42",
        links: [
            { label: "Google Scholar", url: "#" },
            { label: "ResearchGate", url: "#" }
        ]
    },
    3: {
        name: "Dr. Elena Ivanova",
        position: "Research Director",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600",
        bio: "Dr. Elena Ivanova oversees all research activities at BrainLab. She specializes in computer vision and has made significant contributions to self-supervised learning methods. Her work on contrastive learning has been widely adopted in the industry.",
        expertise: ["Computer Vision", "Self-Supervised Learning", "Image Recognition"],
        education: "PhD in Computer Vision, MIPT (2017)",
        publications: "45+ papers in CVPR, ICCV, ECCV",
        links: [
            { label: "Google Scholar", url: "#" },
            { label: "GitHub", url: "#" },
            { label: "Twitter", url: "#" }
        ]
    },
    4: {
        name: "Dr. Alexei Volkov",
        position: "Deep Learning Theory",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600",
        bio: "Dr. Alexei Volkov focuses on theoretical aspects of deep learning, including understanding why neural networks generalize well despite being overparameterized. His recent work on neural tangent kernels has provided new insights into training dynamics.",
        expertise: ["Neural Network Theory", "Optimization Theory", "Mathematical Analysis"],
        education: "PhD in Mathematics, MSU (2018)",
        publications: "30+ papers in NeurIPS, ICML",
        links: [
            { label: "Google Scholar", url: "#" },
            { label: "arXiv", url: "#" }
        ]
    },
    5: {
        name: "Dr. Natalia Fedorova",
        position: "Computer Vision",
        image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600",
        bio: "Dr. Natalia Fedorova leads the computer vision research group. She has extensive experience in object detection, semantic segmentation, and 3D vision. Her work on efficient vision transformers has achieved state-of-the-art results on multiple benchmarks.",
        expertise: ["Object Detection", "Semantic Segmentation", "Vision Transformers"],
        education: "PhD in Computer Vision, MIPT (2019)",
        publications: "35+ papers in top CV conferences",
        links: [
            { label: "Google Scholar", url: "#" },
            { label: "GitHub", url: "#" }
        ]
    },
    6: {
        name: "Dr. Dmitry Kuznetsov",
        position: "Natural Language Processing",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600",
        bio: "Dr. Dmitry Kuznetsov is an expert in natural language processing and large language models. He has worked on various aspects of transformer architectures, from efficient attention mechanisms to multilingual representations. His research has been applied in several industrial NLP systems.",
        expertise: ["Large Language Models", "Transformers", "Multilingual NLP"],
        education: "PhD in Computer Science, MIPT (2020)",
        publications: "40+ papers in ACL, EMNLP, NAACL",
        links: [
            { label: "Google Scholar", url: "#" },
            { label: "GitHub", url: "#" },
            { label: "LinkedIn", url: "#" }
        ]
    },
    7: {
        name: "Dr. Olga Morozova",
        position: "Reinforcement Learning",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
        bio: "Dr. Olga Morozova leads the reinforcement learning research group. Her work focuses on model-based RL and multi-agent systems. She has developed novel algorithms that achieve superior sample efficiency in complex environments.",
        expertise: ["Reinforcement Learning", "Multi-Agent Systems", "Robot Learning"],
        education: "PhD in AI, MIPT (2019)",
        publications: "25+ papers in ICML, NeurIPS",
        links: [
            { label: "Google Scholar", url: "#" },
            { label: "GitHub", url: "#" }
        ]
    },
    8: {
        name: "Ivan Smirnov",
        position: "Machine Learning Engineer",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
        bio: "Ivan Smirnov is a machine learning engineer specializing in implementing and scaling deep learning models. He has extensive experience with PyTorch and TensorFlow, and has built several production ML systems. Ivan is also passionate about open-source software development.",
        expertise: ["Deep Learning Implementation", "MLOps", "Distributed Training"],
        education: "MSc in Computer Science, MIPT (2021)",
        publications: "10+ papers and technical reports",
        links: [
            { label: "GitHub", url: "#" },
            { label: "LinkedIn", url: "#" }
        ]
    },
    9: {
        name: "Tatiana Orlova",
        position: "Research Scientist",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600",
        bio: "Tatiana Orlova is a research scientist working on explainable AI and model interpretability. Her research aims to make deep learning models more transparent and trustworthy, with applications in healthcare and finance.",
        expertise: ["Explainable AI", "Model Interpretability", "Fairness in ML"],
        education: "MSc in Data Science, HSE (2020)",
        publications: "15+ papers in AI safety and interpretability",
        links: [
            { label: "Google Scholar", url: "#" },
            { label: "Medium", url: "#" }
        ]
    },
    10: {
        name: "Sergey Popov",
        position: "AI Research Engineer",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600",
        bio: "Sergey Popov bridges the gap between research and engineering at BrainLab. He specializes in optimization algorithms and has developed several high-performance implementations of modern optimizers used in training large neural networks.",
        expertise: ["Optimization Algorithms", "High-Performance Computing", "Systems Design"],
        education: "MSc in Applied Mathematics, MSU (2020)",
        publications: "12+ papers and open-source projects",
        links: [
            { label: "GitHub", url: "#" },
            { label: "LinkedIn", url: "#" }
        ]
    },
    11: {
        name: "Maria Volkova",
        position: "Research Scientist",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600",
        bio: "Maria Volkova is a research scientist focusing on generative models, including GANs and diffusion models. Her work on text-to-image generation has received significant attention from both the research community and industry.",
        expertise: ["Generative Models", "GANs", "Diffusion Models"],
        education: "MSc in Computer Science, MIPT (2021)",
        publications: "18+ papers in generative modeling",
        links: [
            { label: "Google Scholar", url: "#" },
            { label: "GitHub", url: "#" }
        ]
    },
    12: {
        name: "Pavel Lebedev",
        position: "Machine Learning Engineer",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600",
        bio: "Pavel Lebedev is a machine learning engineer with expertise in building scalable ML infrastructure. He has designed and implemented data pipelines and training systems that enable researchers to experiment with large-scale models efficiently.",
        expertise: ["ML Infrastructure", "Data Engineering", "Cloud Computing"],
        education: "BSc in Computer Science, MIPT (2022)",
        publications: "5+ technical reports and blog posts",
        links: [
            { label: "GitHub", url: "#" },
            { label: "LinkedIn", url: "#" }
        ]
    },
    13: {
        name: "Victoria Romanova",
        position: "Research Scientist",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600",
        bio: "Victoria Romanova is a research scientist working on meta-learning and few-shot learning. Her research enables AI systems to learn new tasks with minimal training data, inspired by human learning capabilities.",
        expertise: ["Meta-Learning", "Few-Shot Learning", "Transfer Learning"],
        education: "MSc in AI, HSE (2021)",
        publications: "14+ papers in meta-learning",
        links: [
            { label: "Google Scholar", url: "#" },
            { label: "Twitter", url: "#" }
        ]
    },
    14: {
        name: "Andrei Novikov",
        position: "PhD Student",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600",
        bio: "Andrei Novikov is a PhD student researching neural architecture search and AutoML. His goal is to automate the design of neural network architectures, making deep learning more accessible to non-experts.",
        expertise: ["Neural Architecture Search", "AutoML", "Hyperparameter Optimization"],
        education: "PhD Candidate, MIPT (Expected 2026)",
        publications: "8+ papers in NAS and AutoML",
        links: [
            { label: "Google Scholar", url: "#" },
            { label: "GitHub", url: "#" }
        ]
    },
    15: {
        name: "Anastasia Kozlova",
        position: "PhD Student",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600",
        bio: "Anastasia Kozlova is a PhD student working on continual learning and lifelong learning systems. Her research addresses the challenge of catastrophic forgetting, enabling AI systems to learn continuously without forgetting previous knowledge.",
        expertise: ["Continual Learning", "Lifelong Learning", "Neural Plasticity"],
        education: "PhD Candidate, MIPT (Expected 2027)",
        publications: "6+ papers in continual learning",
        links: [
            { label: "Google Scholar", url: "#" },
            { label: "GitHub", url: "#" }
        ]
    },
    16: {
        name: "Maxim Vasiliev",
        position: "PhD Student",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600",
        bio: "Maxim Vasiliev is a PhD student focusing on graph neural networks and their applications. He is particularly interested in using GNNs for molecular property prediction and drug discovery.",
        expertise: ["Graph Neural Networks", "Molecular ML", "Drug Discovery"],
        education: "PhD Candidate, MIPT (Expected 2026)",
        publications: "7+ papers in GNNs and applications",
        links: [
            { label: "Google Scholar", url: "#" },
            { label: "GitHub", url: "#" }
        ]
    },
    17: {
        name: "Ekaterina Sokolova",
        position: "PhD Student",
        image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600",
        bio: "Ekaterina Sokolova is a PhD student researching adversarial robustness and AI safety. Her work aims to make neural networks more resilient to adversarial attacks and improve their reliability in safety-critical applications.",
        expertise: ["Adversarial Robustness", "AI Safety", "Certified Defenses"],
        education: "PhD Candidate, MIPT (Expected 2027)",
        publications: "5+ papers in adversarial ML",
        links: [
            { label: "Google Scholar", url: "#" },
            { label: "GitHub", url: "#" }
        ]
    }
};

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('teamModal');
    const modalOverlay = document.getElementById('teamModalOverlay');
    const modalClose = document.getElementById('teamModalClose');
    const teamCards = document.querySelectorAll('.team-card');

    // Open modal
    teamCards.forEach(card => {
        card.addEventListener('click', function() {
            const memberId = this.getAttribute('data-member');
            const member = teamData[memberId];
            
            if (member) {
                // Populate modal
                document.getElementById('modalImage').src = member.image;
                document.getElementById('modalImage').alt = member.name;
                document.getElementById('modalName').textContent = member.name;
                document.getElementById('modalPosition').textContent = member.position;
                
                // Create info section
                const infoHTML = `
                    <div class="modal-bio">
                        <h4>About</h4>
                        <p>${member.bio}</p>
                    </div>
                    <div class="modal-expertise">
                        <h4>Research Interests</h4>
                        <div class="modal-tags">
                            ${member.expertise.map(exp => `<span class="modal-tag">${exp}</span>`).join('')}
                        </div>
                    </div>
                    <div class="modal-details">
                        <div class="modal-detail-item">
                            <strong>Education:</strong> ${member.education}
                        </div>
                        <div class="modal-detail-item">
                            <strong>Publications:</strong> ${member.publications}
                        </div>
                    </div>
                `;
                document.getElementById('modalInfo').innerHTML = infoHTML;
                
                // Create links section
                const linksHTML = `
                    <h4>Links</h4>
                    <div class="modal-links-list">
                        ${member.links.map(link => `
                            <a href="${link.url}" class="modal-link" target="_blank">
                                <span>${link.label}</span>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                            </a>
                        `).join('')}
                    </div>
                `;
                document.getElementById('modalLinks').innerHTML = linksHTML;
                
                // Show modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Close on Esc key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
